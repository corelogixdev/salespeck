const { requirePrismaClient } = require('../utils/prismaClient');
const prisma = requirePrismaClient();

async function resetDatabase() {
    console.log('Starting database reset...');

    try {
        // 1. Clear transactional tables
        console.log('Clearing transactions...');
        await prisma.account_ledger.deleteMany();
        await prisma.account_journal.deleteMany();
        await prisma.cashclosing.deleteMany();
        await prisma.financetransaction.deleteMany();
        await prisma.inventorylogs.deleteMany();
        await prisma.productsalepurchase.deleteMany();
        await prisma.purchasedproducts.deleteMany();
        await prisma.purchase.deleteMany();
        await prisma.soldproducts.deleteMany();
        await prisma.sale.deleteMany();
        await prisma.productbatches.deleteMany();
        await prisma.productsub.deleteMany();
        
        // 2. Clear Products (since they are inventory)
        console.log('Clearing products...');
        await prisma.product.deleteMany();

        // 3. Clear Parties (Customers/Vendors)
        console.log('Identifying customers and vendors...');
        const parties = await prisma.user.findMany({
            where: {
                role: { in: ['customer', 'vendor'] }
            }
        });

        const partyAccountIds = parties.map(p => p.fk_financeaccount_id).filter(id => !!id);

        console.log(`Deleting ${parties.length} customers/vendors...`);
        await prisma.user.deleteMany({
            where: {
                role: { in: ['customer', 'vendor'] }
            }
        });

        if (partyAccountIds.length > 0) {
            console.log(`Deleting ${partyAccountIds.length} party accounts from COA...`);
            await prisma.financeaccount.deleteMany({
                where: {
                    id: { in: partyAccountIds }
                }
            });
        }

        // 4. Reset COA balances for remaining accounts
        console.log('Resetting balances in Chart of Accounts...');
        await prisma.financeaccount.updateMany({
            data: {
                opening_balance: 0,
                value: 0,
                opening_balance_date: null
            }
        });

        console.log('Database reset successfully completed.');
        console.log('Retained: Chart of Account structure, Brands, Categories, Taxes, Software Settings, and Admin Users.');

    } catch (error) {
        console.error('Error resetting database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

resetDatabase();
