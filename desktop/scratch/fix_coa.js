const { requirePrismaClient } = require('../utils/prismaClient');
const prisma = requirePrismaClient();

async function fixCOABalanceTypes() {
    console.log('Fixing COA balance types...');

    try {
        // Liabilities
        await prisma.financeaccount.updateMany({
            where: {
                OR: [
                    { type: 'liability' },
                    { code: { startsWith: '2' } }
                ]
            },
            data: { balance_type: 'CREDIT' }
        });

        // Equity
        await prisma.financeaccount.updateMany({
            where: {
                OR: [
                    { type: 'equity' },
                    { code: { startsWith: '3' } }
                ]
            },
            data: { balance_type: 'CREDIT' }
        });

        // Revenue
        await prisma.financeaccount.updateMany({
            where: {
                OR: [
                    { type: 'revenue' },
                    { code: { startsWith: '4' } }
                ]
            },
            data: { balance_type: 'CREDIT' }
        });

        // Assets
        await prisma.financeaccount.updateMany({
            where: {
                OR: [
                    { type: 'asset' },
                    { code: { startsWith: '1' } }
                ]
            },
            data: { balance_type: 'DEBIT' }
        });

        // Expense
        await prisma.financeaccount.updateMany({
            where: {
                OR: [
                    { type: 'expense' },
                    { code: { startsWith: '5' } }
                ]
            },
            data: { balance_type: 'DEBIT' }
        });

        console.log('COA balance types fixed successfully.');
    } catch (error) {
        console.error('Error fixing COA:', error);
    } finally {
        await prisma.$disconnect();
    }
}

fixCOABalanceTypes();
