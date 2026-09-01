// Consolidated Maintenance Scripts
// Extracted from scratch directory

// --- check_accounts.js ---
/*
const { requirePrismaClient } = require('../utils/prismaClient');
const prisma = requirePrismaClient();

async function main() {
  const accounts = await prisma.financeaccount.findMany();
  console.log(JSON.stringify(accounts, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
      // Don't disconnect global client
  });

*/

// --- check_accounts_v2.js ---
/*
const { PrismaClient } = require('../generated/prisma-client');
const prisma = new PrismaClient();

async function checkAccounts() {
  try {
    const codes = ['5100', '1110', '4100'];
    for (const code of codes) {
      const account = await prisma.financeaccount.findFirst({ where: { code } });
      console.log(`Account ${code}:`, account ? `Found (${account.name})` : 'NOT FOUND');
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAccounts();

*/

// --- check_accounts_v3.js ---
/*
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

*/

// --- fix_coa.js ---
/*
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

*/

// --- reset_db.js ---
/*
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

*/

