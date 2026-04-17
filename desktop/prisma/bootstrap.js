"use strict";

const { execSync } = require("child_process");
const path = require("path");

function run(command) {
  execSync(command, {
    cwd: path.join(__dirname, ".."),
    stdio: "inherit",
  });
}

function bootstrapPrisma() {
  run("npx prisma migrate deploy");
  run("node prisma/seed-must-data.js");
}

if (require.main === module) {
  try {
    bootstrapPrisma();
    process.exit(0);
  } catch (error) {
    console.error("Prisma bootstrap failed:", error);
    process.exit(1);
  }
} else {
  module.exports = bootstrapPrisma;
}
