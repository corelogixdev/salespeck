const { requirePrismaClient } = require("../utils/prismaClient");
const { generateId } = require("../utils/idGenerator");
const logi = require("../utils/logi");

/**
 * Get hierarchical Chart of Accounts
 */
exports.coa = async (req, res) => {
    try {
        const prisma = requirePrismaClient();
        const accounts = await prisma.financeaccount.findMany({
            include: {
                ledger_entries: true
            },
            orderBy: [
                { category: 'asc' },
                { code: 'asc' }
            ]
        });

        // Build hierarchy and calculate balances
        const accountMap = {};
        accounts.forEach(acc => {
            const ledgerSum = acc.ledger_entries.reduce((sum, entry) => {
                return sum + (entry.debit - entry.credit);
            }, 0);
            
            // Raw balance for this specific account
            const ownBalance = (parseFloat(acc.opening_balance) || 0) + ledgerSum;
            accountMap[acc.id] = { ...acc, ownBalance, children: [] };
        });

        const rootAccounts = [];
        accounts.forEach(acc => {
            if (acc.fk_parent_in_financeaccount && accountMap[acc.fk_parent_in_financeaccount]) {
                accountMap[acc.fk_parent_in_financeaccount].children.push(accountMap[acc.id]);
            } else {
                rootAccounts.push(accountMap[acc.id]);
            }
        });

        // Recursive function to calculate aggregated balances
        function calculateAggregateBalance(account) {
            let total = account.ownBalance || 0;
            if (account.children && account.children.length > 0) {
                account.children.forEach(child => {
                    total += calculateAggregateBalance(child);
                });
            }
            account.currentBalance = total;
            return total;
        }

        // Apply aggregation starting from roots
        rootAccounts.forEach(calculateAggregateBalance);

        res.render('accounting/coa', { 
            title: 'Chart of Accounts', 
            accounts: rootAccounts,
            allAccounts: accounts, // For parent selection in forms
            hidenav: false,
            user: res.locals.user
        });
    } catch (error) {
        logi("Error fetching COA:", error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * Save or update an account head
 */
exports.saveAccount = async (req, res) => {
    try {
        const prisma = requirePrismaClient();
        const { id, name, code, category, fk_parent_in_financeaccount, opening_balance, balance_type, opening_balance_date } = req.body;
        
        let parentId = fk_parent_in_financeaccount;
        if (!parentId || parentId === 'null' || parentId === 'undefined' || parentId === '') {
            parentId = null;
        }

        const data = {
            name,
            code,
            category,
            type: category?.toLowerCase(),
            fk_parent_in_financeaccount: parentId,
            opening_balance: parseFloat(opening_balance) || 0,
            opening_balance_date: opening_balance_date ? new Date(opening_balance_date) : null,
            balance_type: balance_type || 'DEBIT',
            updatedAt: new Date()
        };

        if (id) {
            await prisma.financeaccount.update({ where: { id }, data });
        } else {
            await prisma.financeaccount.create({
                data: {
                    id: generateId(32),
                    ...data,
                    source: 'desktop'
                }
            });
        }

        res.json({ success: true, message: "Account saved successfully" });
    } catch (error) {
        logi("Error saving account:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Delete an account head
 */
exports.deleteAccount = async (req, res) => {
    try {
        const prisma = requirePrismaClient();
        const { id } = req.params;

        // Check for children
        const hasChildren = await prisma.financeaccount.findFirst({
            where: { fk_parent_in_financeaccount: id }
        });
        if (hasChildren) {
            return res.status(400).json({ success: false, message: "Cannot delete account with children heads" });
        }

        // Check for ledger entries
        const hasLedger = await prisma.account_ledger.findFirst({
            where: { account_id: id }
        });
        if (hasLedger) {
            return res.status(400).json({ success: false, message: "Cannot delete account with transaction history" });
        }

        await prisma.financeaccount.delete({ where: { id } });
        res.json({ success: true, message: "Account deleted successfully" });
    } catch (error) {
        logi("Error deleting account:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Reset Chart of Accounts
 */
exports.resetCOA = async (req, res) => {
    try {
        const prisma = requirePrismaClient();
        
        await prisma.$transaction(async (tx) => {
            // Delete all ledger entries and journals first due to FK constraints
            await tx.account_ledger.deleteMany({});
            await tx.account_journal.deleteMany({});
            
            // Unlink users from accounts
            await tx.user.updateMany({
                data: { fk_financeaccount_id: null }
            });

            // Delete non-root accounts (children, grandchildren, etc.)
            // We delete in reverse levels to respect FK constraints if any
            // For simplicity in SQLite, we can try multiple passes or just a broad delete
            // Here we'll delete all that have a parent
            await tx.financeaccount.deleteMany({
                where: { fk_parent_in_financeaccount: { not: null } }
            });

            // Reset balances of root accounts
            await tx.financeaccount.updateMany({
                data: { opening_balance: 0 }
            });
        });

        res.json({ success: true, message: "Sub-accounts and transactions have been reset. Main account types were preserved." });
    } catch (error) {
        logi("Error resetting COA:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Helper to record a double-entry journal entry
 * @param {Object} prisma - Prisma transaction or client
 * @param {Object} entryData - { date, description, reference, source, lines: [{ account_id, debit, credit, details }] }
 */
exports.recordJournalEntry = async (prisma, entryData) => {
    const { date, description, reference, source, lines } = entryData;

    // Validate balance
    const totalDebit = lines.reduce((sum, l) => sum + (parseFloat(l.debit) || 0), 0);
    const totalCredit = lines.reduce((sum, l) => sum + (parseFloat(l.credit) || 0), 0);

    if (Math.abs(totalDebit - totalCredit) > 0.01) {
        throw new Error(`Journal entry is not balanced. Debit: ${totalDebit}, Credit: ${totalCredit}`);
    }

    const journal = await prisma.account_journal.create({
        data: {
            id: generateId(32),
            date: date ? new Date(date) : new Date(),
            description,
            reference,
            source: source || 'desktop',
            ledger_entries: {
                create: lines.map(l => ({
                    id: generateId(32),
                    account_id: l.account_id,
                    debit: parseFloat(l.debit) || 0,
                    credit: parseFloat(l.credit) || 0,
                    details: l.details
                }))
            }
        }
    });

    return journal;
};

/**
 * Get Ledger for a specific party
 */
exports.getPartyLedger = async (req, res) => {
    try {
        const { id } = req.params;
        const prisma = requirePrismaClient();
        
        const party = await prisma.user.findUnique({
            where: { id }
        });

        if (!party || !party.fk_financeaccount_id) {
            return res.json({ success: true, ledger: [] });
        }

        const ledger = await prisma.account_ledger.findMany({
            where: { account_id: party.fk_financeaccount_id },
            include: {
                journal: true
            },
            orderBy: {
                journal: {
                    date: 'desc'
                }
            }
        });

        // Enrich ledger with invoice numbers (replaces UUIDs with invoicenum in descriptions)
        const references = [...new Set(ledger.map(e => e.journal.reference).filter(Boolean))];
        if (references.length > 0) {
            const [purchases, sales] = await Promise.all([
                prisma.purchase.findMany({
                    where: { id: { in: references } },
                    select: { id: true, invoicenum: true }
                }),
                prisma.sale.findMany({
                    where: { id: { in: references } },
                    select: { id: true, invoicenum: true }
                })
            ]);

            const invoiceMap = new Map();
            purchases.forEach(p => invoiceMap.set(p.id, p.invoicenum));
            sales.forEach(s => invoiceMap.set(s.id, s.invoicenum));

            ledger.forEach(entry => {
                const ref = entry.journal.reference;
                const invNum = invoiceMap.get(ref);
                if (invNum) {
                    if (entry.journal.description) {
                        entry.journal.description = entry.journal.description.replace(new RegExp(ref, 'g'), invNum);
                    }
                    if (entry.details) {
                        entry.details = entry.details.replace(new RegExp(ref, 'g'), invNum);
                    }
                }
            });
        }

        res.json({ success: true, ledger });
    } catch (error) {
        console.error("Error fetching party ledger:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
