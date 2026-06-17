const { execSync } = require('child_process');
const path = require('path');
const { requirePrismaClient } = require('../utils/prismaClient');
const encrypt = require('../utils/encrypt');
const { generateId } = require('../utils/idGenerator');

async function main() {
    console.log("Resetting database...");
    execSync('npx prisma db push --force-reset', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    
    console.log("Seeding base data (Chart of Accounts & Company)...");
    execSync('node prisma/seed-must-data.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

    console.log("Seeding admin user...");
    const prisma = requirePrismaClient();
    try {
        await prisma.user.create({
            data: {
                id: generateId(32),
                firstname: 'Admin',
                lastname: 'User',
                username: 'admin',
                email: 'admin@example.com',
                password: encrypt.encrypt('123'),
                role: 'admin',
                source: 'custom-seed',
                dashboard_config: '{}',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
        console.log("Admin user seeded successfully. (username: admin, password: 123)");
    } catch (e) {
        console.error("Error seeding user:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch(console.error);
