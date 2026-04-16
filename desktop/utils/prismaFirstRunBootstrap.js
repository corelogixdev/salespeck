const db = require("../models");
const logi = require("./logi");
const { generateId } = require("./idGenerator");
const seedPrisma = require("../scripts/prisma-seed");

const PRISMA_BOOTSTRAP_MARKER = "prisma_bootstrap_v1";

async function prismaFirstRunBootstrap() {
  try {
    // Ensure tables exist before checking marker and seeding.
    await db.sequelize.sync();

    const existingMarker = await db.softwaresetting.findOne({
      where: { name: PRISMA_BOOTSTRAP_MARKER },
    });

    if (existingMarker) {
      return;
    }

    logi("Running first-time Prisma bootstrap...");
    await seedPrisma({ disconnect: false });

    await db.softwaresetting.create({
      id: generateId(32),
      name: PRISMA_BOOTSTRAP_MARKER,
      value: new Date().toISOString(),
      source: "system-bootstrap",
    });

    logi("First-time Prisma bootstrap completed.");
  } catch (error) {
    logi("Prisma first-run bootstrap failed:", error.message || error);
  }
}

module.exports = prismaFirstRunBootstrap;
