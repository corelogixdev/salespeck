#!/usr/bin/env node
"use strict";

/**
 * Issue a signed SalesPeck license key.
 *
 * Usage:
 *   node scripts/issue-license.js --seats 5 --plan yearly --client "Acme" --days 365
 *   node scripts/issue-license.js --seats 3 --plan monthly --client "Shop" --days 30 --out ./licenses/shop.json
 *
 * Requires: config/license-keys/private.pem (never commit this file)
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { signPayload, encodeLicenseKey, getMachineFingerprint } = require("../utils/license");

function argValue(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1 || !process.argv[idx + 1]) return null;
  return process.argv[idx + 1];
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function usage() {
  console.log(`Usage:
  node scripts/issue-license.js --seats <n> --plan monthly|yearly --client "<name>" [--days <n>] [--out <file>] [--bind] [--fingerprint <hash>]

  --bind              Bind license to THIS machine's fingerprint
  --fingerprint <h>   Bind to a fingerprint collected from the client PC
                      (run: node -e "console.log(require('./utils/license').getMachineFingerprint())")

Defaults: --days 30 for monthly, 365 for yearly
`);
}

(async () => {
  if (hasFlag("--print-fingerprint")) {
    console.log(getMachineFingerprint());
    process.exit(0);
  }

  const seats = parseInt(argValue("--seats") || "", 10);
  const plan = (argValue("--plan") || "").toLowerCase();
  const client = argValue("--client");
  const outPath = argValue("--out");
  let days = parseInt(argValue("--days") || "", 10);
  let machineFingerprint = argValue("--fingerprint");
  if (hasFlag("--bind")) {
    machineFingerprint = getMachineFingerprint();
  }

  if (!seats || !plan || !client || !["monthly", "yearly"].includes(plan)) {
    usage();
    process.exit(1);
  }
  if (!Number.isFinite(days) || days < 1) {
    days = plan === "yearly" ? 365 : 30;
  }

  const privateKeyPath = path.join(__dirname, "..", "config", "license-keys", "private.pem");
  if (!fs.existsSync(privateKeyPath)) {
    console.error("Missing private key at config/license-keys/private.pem");
    console.error("Generate with: node scripts/generate-license-keys.js");
    process.exit(1);
  }

  const privateKeyPem = fs.readFileSync(privateKeyPath, "utf8");
  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt.getTime() + days * 24 * 60 * 60 * 1000);

  const payload = {
    licenseId: crypto.randomUUID(),
    clientName: client,
    maxUsers: seats,
    plan,
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    features: [],
    machineFingerprint: machineFingerprint || null,
  };

  const doc = signPayload(payload, privateKeyPem);
  const key = encodeLicenseKey(doc);

  const licensesDir = path.join(__dirname, "..", "config", "license-keys");
  const logPath = path.join(licensesDir, "issued-licenses.csv");
  if (!fs.existsSync(logPath)) {
    fs.writeFileSync(
      logPath,
      "issuedAt,licenseId,clientName,maxUsers,plan,expiresAt\n",
      "utf8"
    );
  }
  fs.appendFileSync(
    logPath,
    `${payload.issuedAt},${payload.licenseId},"${payload.clientName.replace(/"/g, '""')}",${payload.maxUsers},${payload.plan},${payload.expiresAt}\n`,
    "utf8"
  );

  if (outPath) {
    const abs = path.resolve(outPath);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, JSON.stringify(doc, null, 2), "utf8");
    console.log("Wrote JSON:", abs);
  }

  console.log("\n=== License issued ===");
  console.log(JSON.stringify(payload, null, 2));
  console.log("\n=== Paste this key in the app (Activation) ===\n");
  console.log(key);
  console.log("\nLogged to:", logPath);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
