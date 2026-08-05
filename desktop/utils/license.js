"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const { requirePrismaClient } = require("./prismaClient");

const GRACE_DAYS = 7;
const STAFF_ROLES = ["branchmanager", "user"];

const EMBEDDED_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA27sp2LaMP01J/vwfaVyyM7Alekh0oNAINgLVpuqP3+Q=
-----END PUBLIC KEY-----
`;

function getLicenseDir() {
  if (__dirname.includes("app.asar")) {
    const appDataPath =
      process.env.APPDATA ||
      (process.platform === "darwin"
        ? path.join(os.homedir(), "Library", "Application Support")
        : path.join(os.homedir(), ".config"));
    const dir = path.join(appDataPath, "stitchcore");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return dir;
  }
  return path.join(__dirname, "..");
}

function getLicensePath() {
  return path.join(getLicenseDir(), "license.json");
}

function canonicalPayload(payload) {
  const keys = Object.keys(payload).sort();
  const ordered = {};
  for (const k of keys) ordered[k] = payload[k];
  return JSON.stringify(ordered);
}

function getMachineFingerprint() {
  const raw = [
    os.hostname(),
    os.platform(),
    os.arch(),
    os.userInfo().username || "",
  ].join("|");
  return crypto.createHash("sha256").update(raw).digest("hex").slice(0, 32);
}

function verifySignedLicense(doc) {
  if (!doc || typeof doc !== "object" || !doc.payload || !doc.signature) {
    return { ok: false, error: "License format invalid" };
  }
  const payload = doc.payload;
  const required = ["licenseId", "clientName", "maxUsers", "plan", "issuedAt", "expiresAt"];
  for (const key of required) {
    if (payload[key] === undefined || payload[key] === null || payload[key] === "") {
      return { ok: false, error: `Missing field: ${key}` };
    }
  }
  if (!["monthly", "yearly"].includes(String(payload.plan))) {
    return { ok: false, error: "plan must be monthly or yearly" };
  }
  const maxUsers = Number(payload.maxUsers);
  if (!Number.isFinite(maxUsers) || maxUsers < 1) {
    return { ok: false, error: "maxUsers must be a positive number" };
  }

  try {
    const publicKey = crypto.createPublicKey(EMBEDDED_PUBLIC_KEY_PEM);
    const data = Buffer.from(canonicalPayload(payload), "utf8");
    const signature = Buffer.from(doc.signature, "base64");
    const valid = crypto.verify(null, data, publicKey, signature);
    if (!valid) return { ok: false, error: "Signature verification failed" };
  } catch (e) {
    return { ok: false, error: e.message || "Signature check error" };
  }

  if (payload.machineFingerprint) {
    const local = getMachineFingerprint();
    if (String(payload.machineFingerprint) !== local) {
      return {
        ok: false,
        error: "This license is bound to another machine",
      };
    }
  }

  return { ok: true, payload: { ...payload, maxUsers } };
}

function parseLicenseKey(raw) {
  const text = String(raw || "").trim();
  if (!text) throw new Error("Empty license key");

  let jsonStr = text;
  if (!text.startsWith("{")) {
    try {
      jsonStr = Buffer.from(text, "base64").toString("utf8");
    } catch {
      throw new Error("License key is not valid Base64 or JSON");
    }
  }
  let doc;
  try {
    doc = JSON.parse(jsonStr);
  } catch {
    throw new Error("License key JSON could not be parsed");
  }
  return doc;
}

function loadLicenseFile() {
  const licensePath = getLicensePath();
  if (!fs.existsSync(licensePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(licensePath, "utf8"));
  } catch {
    return null;
  }
}

function saveLicenseFile(doc) {
  const licensePath = getLicensePath();
  fs.writeFileSync(licensePath, JSON.stringify(doc, null, 2), "utf8");
  return licensePath;
}

function daysBetween(from, to) {
  return (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
}

async function countStaffSeats() {
  try {
    const prisma = requirePrismaClient();
    return prisma.user.count({
      where: { role: { in: STAFF_ROLES } },
    });
  } catch {
    return 0;
  }
}

function evaluatePayload(payload, seatsUsed = 0) {
  const now = new Date();
  const expiresAt = new Date(payload.expiresAt);
  const issuedAt = new Date(payload.issuedAt);
  if (Number.isNaN(expiresAt.getTime()) || Number.isNaN(issuedAt.getTime())) {
    return {
      state: "invalid",
      payload,
      seatsUsed,
      seatsMax: Number(payload.maxUsers) || 0,
      message: "Invalid license dates",
      graceDays: GRACE_DAYS,
      allowsAppUse: false,
    };
  }

  const daysLeft = daysBetween(now, expiresAt);
  const seatsMax = Number(payload.maxUsers) || 0;

  if (daysLeft >= 0) {
    return {
      state: "valid",
      payload,
      seatsUsed,
      seatsMax,
      daysRemaining: Math.ceil(daysLeft),
      expiresAt: expiresAt.toISOString(),
      plan: payload.plan,
      clientName: payload.clientName,
      message: `Licensed until ${expiresAt.toISOString().slice(0, 10)}`,
      graceDays: GRACE_DAYS,
      allowsAppUse: true,
    };
  }

  const daysPast = -daysLeft;
  if (daysPast <= GRACE_DAYS) {
    return {
      state: "grace",
      payload,
      seatsUsed,
      seatsMax,
      daysRemaining: Math.ceil(GRACE_DAYS - daysPast),
      expiresAt: expiresAt.toISOString(),
      plan: payload.plan,
      clientName: payload.clientName,
      message: `Subscription expired — grace period (${Math.ceil(GRACE_DAYS - daysPast)} day(s) left). Renew soon.`,
      graceDays: GRACE_DAYS,
      allowsAppUse: true,
    };
  }

  return {
    state: "expired",
    payload,
    seatsUsed,
    seatsMax,
    daysRemaining: 0,
    expiresAt: expiresAt.toISOString(),
    plan: payload.plan,
    clientName: payload.clientName,
    message: "Subscription expired. Activate a renewed license to continue.",
    graceDays: GRACE_DAYS,
    allowsAppUse: false,
  };
}

async function getLicenseStatus() {
  const doc = loadLicenseFile();
  if (!doc) {
    return {
      state: "missing",
      payload: null,
      seatsUsed: await countStaffSeats(),
      seatsMax: 0,
      message: "No license activated",
      allowsAppUse: false,
      graceDays: GRACE_DAYS,
    };
  }

  const verified = verifySignedLicense(doc);
  if (!verified.ok) {
    return {
      state: "invalid",
      payload: null,
      seatsUsed: await countStaffSeats(),
      seatsMax: 0,
      message: verified.error || "Invalid license",
      allowsAppUse: false,
      graceDays: GRACE_DAYS,
    };
  }

  const seatsUsed = await countStaffSeats();
  return evaluatePayload(verified.payload, seatsUsed);
}

async function activateLicense(rawKey) {
  const doc = parseLicenseKey(rawKey);
  const verified = verifySignedLicense(doc);
  if (!verified.ok) {
    throw new Error(verified.error || "Invalid license");
  }
  saveLicenseFile({
    payload: verified.payload,
    signature: doc.signature,
    activatedAt: new Date().toISOString(),
  });
  return getLicenseStatus();
}

async function assertCanAddStaffSeat(extraSeats = 1) {
  const status = await getLicenseStatus();
  if (!status.allowsAppUse) {
    throw new Error(status.message || "License does not allow creating users");
  }
  const seatsUsed = status.seatsUsed || 0;
  const seatsMax = status.seatsMax || 0;
  if (seatsUsed + extraSeats > seatsMax) {
    throw new Error(
      `Staff seat limit reached (${seatsUsed}/${seatsMax}). Upgrade your license to add more users.`
    );
  }
  return status;
}

function isStaffRole(role) {
  return STAFF_ROLES.includes(String(role || "").toLowerCase());
}

function signPayload(payload, privateKeyPem) {
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  const data = Buffer.from(canonicalPayload(payload), "utf8");
  const signature = crypto.sign(null, data, privateKey);
  return {
    payload,
    signature: signature.toString("base64"),
  };
}

function encodeLicenseKey(doc) {
  return Buffer.from(JSON.stringify(doc), "utf8").toString("base64");
}

module.exports = {
  GRACE_DAYS,
  STAFF_ROLES,
  EMBEDDED_PUBLIC_KEY_PEM,
  getLicensePath,
  getLicenseDir,
  verifySignedLicense,
  parseLicenseKey,
  loadLicenseFile,
  saveLicenseFile,
  countStaffSeats,
  getLicenseStatus,
  activateLicense,
  assertCanAddStaffSeat,
  isStaffRole,
  signPayload,
  encodeLicenseKey,
  canonicalPayload,
  getMachineFingerprint,
};
