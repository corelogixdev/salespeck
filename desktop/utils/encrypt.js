const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

function legacyEncrypt(v) {
  const va = Buffer.from(String(v)).toString("base64");
  const vb = Buffer.from(va).toString("base64");
  return vb.split("").reverse().join("");
}

function legacyCompare(enc, v) {
  try {
    const va = String(enc).split("").reverse().join("");
    const vb = Buffer.from(va, "base64").toString("ascii");
    const vc = Buffer.from(vb, "base64").toString("ascii");
    return vc === String(v);
  } catch {
    return false;
  }
}

function isBcryptHash(enc) {
  return typeof enc === "string" && /^\$2[aby]?\$/.test(enc);
}

/** Hash a new password (bcrypt). */
module.exports.encrypt = (v) => {
  return bcrypt.hashSync(String(v), SALT_ROUNDS);
};

/** Compare plaintext to stored hash (bcrypt or legacy). */
module.exports.compare = (enc, v) => {
  if (!enc) return false;
  if (isBcryptHash(enc)) {
    try {
      return bcrypt.compareSync(String(v), enc);
    } catch {
      return false;
    }
  }
  return legacyCompare(enc, v);
};

module.exports.isLegacyHash = (enc) => !!enc && !isBcryptHash(enc);

/** Re-encode with bcrypt (for upgrading legacy hashes after successful login). */
module.exports.upgradeHash = (plain) => module.exports.encrypt(plain);

/** @deprecated kept for rare tooling; prefer encrypt() */
module.exports.legacyEncrypt = legacyEncrypt;
module.exports.decrypt = (enc) => {
  if (isBcryptHash(enc)) {
    throw new Error("Cannot decrypt bcrypt hashes");
  }
  const va = String(enc).split("").reverse().join("");
  const vb = Buffer.from(va, "base64").toString("ascii");
  return Buffer.from(vb, "base64").toString("ascii");
};
