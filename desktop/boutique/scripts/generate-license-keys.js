#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { generateKeyPairSync } = require("crypto");

const dir = path.join(__dirname, "..", "config", "license-keys");
fs.mkdirSync(dir, { recursive: true });

const privatePath = path.join(dir, "private.pem");
const publicPath = path.join(dir, "public.pem");

if (fs.existsSync(privatePath) && !process.argv.includes("--force")) {
  console.error("Keys already exist. Pass --force to overwrite (will invalidate old licenses).");
  process.exit(1);
}

const { publicKey, privateKey } = generateKeyPairSync("ed25519");
fs.writeFileSync(privatePath, privateKey.export({ type: "pkcs8", format: "pem" }));
fs.writeFileSync(publicPath, publicKey.export({ type: "spki", format: "pem" }));

console.log("Wrote:", privatePath);
console.log("Wrote:", publicPath);
console.log("\nIMPORTANT: Copy the public PEM into desktop/utils/license.js EMBEDDED_PUBLIC_KEY_PEM");
console.log("Never commit private.pem. Keep issued-licenses.csv private.");
