const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const accounts = await prisma.financeaccount.findMany({
        where: {
            OR: [
                { code: { startsWith: '510' } }, // COGS
                { code: { startsWith: '410' } }, // Revenue
                { name: { contains: 'Payable' } },
                { name: { contains: 'Receivable' } }
            ]
        },
        select: { id: true, code: true, name: true, fk_parent_in_financeaccount: true }
    });
    console.log(JSON.stringify(accounts, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
