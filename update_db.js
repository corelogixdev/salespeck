const { requirePrismaClient } = require('./desktop/utils/prismaClient');
const prisma = requirePrismaClient();

async function main() {
    console.log('Starting product migration...');
    const result = await prisma.product.updateMany({
        data: {
            is_service: true
        }
    });
    console.log(`Updated ${result.count} products to be services.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
