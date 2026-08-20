"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const { requirePrismaClient, getPrismaClient } = require("./prismaClient");
const { generateId } = require("./idGenerator");

const GRACE_DAYS = 7;
const STAFF_ROLES = ["branchmanager", "user"];
const CLOCK_ROLLBACK_TOLERANCE_MS = 2 * 60 * 60 * 1000; // 2 hours
const ISSUED_AT_SKEW_MS = 24 * 60 * 60 * 1000; // 1 day
const LICENSE_LAST_SEEN_SETTING = "license_last_seen";

const EMBEDDED_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAEtDfxwOmpxH4IzrCn63gINlmAHhsK3YA3YYvzrMBmhY=
-----END PUBLIC KEY-----
`;

function getLicenseDir() {
  if (__dirname.includes("app.asar")) {
    const appDataPath =
      process.env.APPDATA ||
      (process.platform === "darwin"
        ? path.join(os.homedir(), "Library", "Application Support")
        : path.join(os.homedir(), ".config"));
    const dir = path.join(appDataPath, "salespeck");
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
  let cpuModel = "";
  try {
    const cpus = os.cpus();
    cpuModel = (cpus && cpus[0] && cpus[0].model) || "";
  } catch {
    cpuModel = "";
  }
  const raw = [
    os.hostname(),
    os.platform(),
    os.arch(),
    os.userInfo().username || "",
    cpuModel,
  ].join("|");
  return crypto.createHash("sha256").update(raw).digest("hex").slice(0, 32);
}

function parseIsoDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function maxDate(...dates) {
  let best = null;
  for (const d of dates) {
    if (!d || Number.isNaN(d.getTime())) continue;
    if (!best || d.getTime() > best.getTime()) best = d;
  }
  return best;
}

async function readDbLastSeen() {
  try {
    const prisma = getPrismaClient();
    if (!prisma) return null;
    const row = await prisma.softwaresetting.findFirst({
      where: { name: LICENSE_LAST_SEEN_SETTING },
    });
    return parseIsoDate(row?.value);
  } catch {
    return null;
  }
}

async function writeDbLastSeen(iso) {
  try {
    const prisma = getPrismaClient();
    if (!prisma) return;
    const existing = await prisma.softwaresetting.findFirst({
      where: { name: LICENSE_LAST_SEEN_SETTING },
    });
    if (existing) {
      await prisma.softwaresetting.update({
        where: { id: existing.id },
        data: { value: iso },
      });
    } else {
      await prisma.softwaresetting.create({
        data: {
          id: generateId(32),
          name: LICENSE_LAST_SEEN_SETTING,
          value: iso,
          source: "license-clock",
        },
      });
    }
  } catch {
    // DB may not be ready; license.json watermark still applies.
  }
}

function checkFingerprintBinding(doc) {
  const local = getMachineFingerprint();
  const signed = doc?.payload?.machineFingerprint
    ? String(doc.payload.machineFingerprint)
    : null;
  const bound = doc?.boundFingerprint ? String(doc.boundFingerprint) : null;

  if (signed && signed !== local) {
    return { ok: false, error: "This license is bound to another machine" };
  }
  if (bound && bound !== local) {
    return { ok: false, error: "This license is bound to another machine" };
  }
  return { ok: true, local, signed, bound };
}

function resolveBindMode(doc) {
  if (doc?.payload?.machineFingerprint) return "Signed";
  if (doc?.boundFingerprint) return "Bound on activate";
  return "Unbound";
}

function verifySignatureOnly(doc) {
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

  return { ok: true, payload: { ...payload, maxUsers } };
}

function verifySignedLicense(doc) {
  const signed = verifySignatureOnly(doc);
  if (!signed.ok) return signed;

  const fp = checkFingerprintBinding(doc);
  if (!fp.ok) return fp;

  return signed;
}

function parseLicenseKey(raw) {
  let text = String(raw || "")
    .replace(/^\uFEFF/, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim();
  if (!text) throw new Error("Empty license key");

  let jsonStr = text;
  if (!text.startsWith("{")) {
    const compact = text
      .replace(/[\r\n\t]/g, "")
      .replace(/ /g, "+")
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    try {
      jsonStr = Buffer.from(compact, "base64").toString("utf8");
    } catch {
      throw new Error("License key is not valid Base64 or JSON");
    }
    if (!jsonStr.trim().startsWith("{")) {
      throw new Error(
        `License key JSON could not be parsed (got ${text.length} chars after paste; paste the FULL key — it should start with eyJ)`
      );
    }
  }
  let doc;
  try {
    doc = JSON.parse(jsonStr);
  } catch {
    throw new Error(
      `License key JSON could not be parsed (got ${text.length} chars after paste; paste the FULL key — it should start with eyJ)`
    );
  }
  return doc;
}

function buildActivationRecord(verifiedPayload, signature, extras = {}) {
  const nowIso = new Date().toISOString();
  const localFp = getMachineFingerprint();
  return {
    payload: verifiedPayload,
    signature,
    activatedAt: extras.activatedAt || nowIso,
    boundFingerprint: extras.boundFingerprint || localFp,
    lastSeenAt: extras.lastSeenAt || nowIso,
  };
}

function saveLicenseFile(doc) {
  const licensePath = getLicensePath();
  fs.writeFileSync(licensePath, JSON.stringify(doc, null, 2), "utf8");
  return licensePath;
}

function loadLicenseFile() {
  const licensePath = getLicensePath();
  if (!fs.existsSync(licensePath)) return null;
  try {
    const raw = fs.readFileSync(licensePath, "utf8").replace(/^\uFEFF/, "").trim();
    if (!raw) return null;

    if (!raw.startsWith("{")) {
      try {
        const doc = parseLicenseKey(raw);
        const signed = verifySignatureOnly(doc);
        if (!signed.ok) return null;
        if (doc.payload.machineFingerprint) {
          const local = getMachineFingerprint();
          if (String(doc.payload.machineFingerprint) !== local) return null;
        }
        const saved = buildActivationRecord(signed.payload, doc.signature);
        saveLicenseFile(saved);
        return saved;
      } catch {
        return null;
      }
    }

    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function importLicenseKeyFiles() {
  const dir = getLicenseDir();
  const candidates = [
    "license-key.txt",
    "licence.txt",
    "license.txt",
    "licence-key.txt",
  ];

  for (const name of candidates) {
    const filePath = path.join(dir, name);
    if (!fs.existsSync(filePath)) continue;
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const doc = parseLicenseKey(raw);
      const signed = verifySignatureOnly(doc);
      if (!signed.ok) continue;
      if (doc.payload.machineFingerprint) {
        const local = getMachineFingerprint();
        if (String(doc.payload.machineFingerprint) !== local) continue;
      }
      saveLicenseFile(buildActivationRecord(signed.payload, doc.signature));
      return true;
    } catch {
      // try next
    }
  }
  return false;
}

async function ensureLicenseImported() {
  const existing = loadLicenseFile();
  if (existing) {
    const signed = verifySignatureOnly(existing);
    if (signed.ok) return true;
  }
  return importLicenseKeyFiles();
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

function evaluatePayload(payload, seatsUsed = 0, extras = {}) {
  const now = extras.now || new Date();
  const expiresAt = new Date(payload.expiresAt);
  const issuedAt = new Date(payload.issuedAt);
  const fingerprint = extras.fingerprint || getMachineFingerprint();
  const bindMode = extras.bindMode || "Unbound";

  const baseMeta = {
    fingerprint,
    bound: bindMode !== "Unbound",
    bindMode,
    clockState: "ok",
    graceDays: GRACE_DAYS,
  };

  if (Number.isNaN(expiresAt.getTime()) || Number.isNaN(issuedAt.getTime())) {
    return {
      state: "invalid",
      payload,
      seatsUsed,
      seatsMax: Number(payload.maxUsers) || 0,
      message: "Invalid license dates",
      allowsAppUse: false,
      ...baseMeta,
      clockState: "invalid_dates",
    };
  }

  if (now.getTime() < issuedAt.getTime() - ISSUED_AT_SKEW_MS) {
    return {
      state: "clock_invalid",
      payload,
      seatsUsed,
      seatsMax: Number(payload.maxUsers) || 0,
      message: "System clock is before license issue date. Correct the date/time.",
      allowsAppUse: false,
      expiresAt: expiresAt.toISOString(),
      plan: payload.plan,
      clientName: payload.clientName,
      ...baseMeta,
      clockState: "before_issued",
    };
  }

  if (extras.watermark) {
    const watermark = extras.watermark;
    if (now.getTime() < watermark.getTime() - CLOCK_ROLLBACK_TOLERANCE_MS) {
      return {
        state: "clock_tamper",
        payload,
        seatsUsed,
        seatsMax: Number(payload.maxUsers) || 0,
        message:
          "System clock moved backward. Correct the date/time to continue using SalesPeck.",
        allowsAppUse: false,
        expiresAt: expiresAt.toISOString(),
        plan: payload.plan,
        clientName: payload.clientName,
        ...baseMeta,
        clockState: "rollback",
        lastSeenAt: watermark.toISOString(),
      };
    }
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
      allowsAppUse: true,
      ...baseMeta,
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
      allowsAppUse: true,
      ...baseMeta,
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
    allowsAppUse: false,
    ...baseMeta,
  };
}

async function advanceWatermark(doc, now) {
  const fileSeen = parseIsoDate(doc.lastSeenAt);
  const dbSeen = await readDbLastSeen();
  const watermark = maxDate(fileSeen, dbSeen);
  const next = maxDate(now, watermark) || now;
  const nextIso = next.toISOString();

  const updated = {
    ...doc,
    boundFingerprint: doc.boundFingerprint || getMachineFingerprint(),
    lastSeenAt: nextIso,
  };
  saveLicenseFile(updated);
  await writeDbLastSeen(nextIso);
  return next;
}

async function getLicenseStatus() {
  const fingerprint = getMachineFingerprint();
  const emptyMeta = {
    fingerprint,
    bound: false,
    bindMode: "Unbound",
    clockState: "ok",
    graceDays: GRACE_DAYS,
  };

  let doc = loadLicenseFile();
  if (!doc) {
    return {
      state: "missing",
      payload: null,
      seatsUsed: await countStaffSeats(),
      seatsMax: 0,
      message: "No license activated",
      allowsAppUse: false,
      ...emptyMeta,
    };
  }

  // Legacy activations: auto-bind fingerprint once
  if (!doc.boundFingerprint && !doc.payload?.machineFingerprint) {
    doc = {
      ...doc,
      boundFingerprint: fingerprint,
    };
    saveLicenseFile(doc);
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
      ...emptyMeta,
      bindMode: resolveBindMode(doc),
      bound: resolveBindMode(doc) !== "Unbound",
    };
  }

  const fileSeen = parseIsoDate(doc.lastSeenAt);
  const dbSeen = await readDbLastSeen();
  const watermark = maxDate(fileSeen, dbSeen);
  const now = new Date();
  const seatsUsed = await countStaffSeats();
  const status = evaluatePayload(verified.payload, seatsUsed, {
    now,
    watermark,
    fingerprint,
    bindMode: resolveBindMode(doc),
  });

  if (status.allowsAppUse) {
    await advanceWatermark(doc, now);
    status.lastSeenAt = (maxDate(now, watermark) || now).toISOString();
  } else if (watermark) {
    status.lastSeenAt = watermark.toISOString();
  }

  return status;
}

async function activateLicense(rawKey) {
  const doc = parseLicenseKey(rawKey);
  const local = getMachineFingerprint();
  const signed = verifySignatureOnly(doc);
  if (!signed.ok) {
    throw new Error(signed.error || "Invalid license");
  }

  if (doc.payload?.machineFingerprint) {
    if (String(doc.payload.machineFingerprint) !== local) {
      throw new Error("This license is bound to another machine");
    }
  }

  const now = new Date();
  const issuedAt = new Date(doc.payload.issuedAt);
  if (!Number.isNaN(issuedAt.getTime()) && now.getTime() < issuedAt.getTime() - ISSUED_AT_SKEW_MS) {
    throw new Error("System clock is before license issue date. Correct the date/time.");
  }

  const saved = buildActivationRecord(signed.payload, doc.signature, {
    activatedAt: now.toISOString(),
    boundFingerprint: local,
    lastSeenAt: now.toISOString(),
  });
  saveLicenseFile(saved);
  await writeDbLastSeen(now.toISOString());
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
  CLOCK_ROLLBACK_TOLERANCE_MS,
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
  importLicenseKeyFiles,
  ensureLicenseImported,
};
