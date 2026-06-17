const { requirePrismaClient } = require('../utils/prismaClient');
const { seedMustData } = require('../prisma/seed-must-data');

async function fixDupes() {
    const prisma = requirePrismaClient();
    try {
        console.log("Deleting all finance accounts...");
        await prisma.financeaccount.deleteMany({});
        console.log("Re-seeding finance accounts...");
        await seedMustData({ disconnect: false });
        console.log("Done.");
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

fixDupes();
