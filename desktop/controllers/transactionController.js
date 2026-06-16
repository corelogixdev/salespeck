const queries = require('../prisma/queries');

exports.index = async (req, res) => {
    try {
        const journals = await queries.accounting.getAllJournals(req.query);
        res.render('accounting/transactions/index', {
            title: 'General Journal',
            journals
        });
    } catch (error) {
        console.error("Error fetching journals:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
};

exports.form = async (req, res) => {
    try {
        const prisma = queries.common.getPrisma();
        const accounts = await prisma.financeaccount.findMany({
            orderBy: { code: 'asc' }
        });

        res.render('accounting/transactions/form', {
            title: 'New Journal Entry',
            accounts
        });
    } catch (error) {
        console.error("Error loading journal form:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
};

exports.save = async (req, res) => {
    try {
        const { date, description, reference, entries } = req.body;
        const userId = req.session?.user?.id || 'system';

        if (!entries || entries.length < 2) {
            return res.status(400).send("A journal entry requires at least two lines.");
        }

        // Validate debits and credits equal
        let totalDebit = 0;
        let totalCredit = 0;

        const formattedEntries = entries.map(entry => {
            const debit = parseFloat(entry.debit) || 0;
            const credit = parseFloat(entry.credit) || 0;
            totalDebit += debit;
            totalCredit += credit;
            return {
                account_id: entry.account_id,
                debit: debit,
                credit: credit,
                details: entry.details || description
            };
        });

        if (Math.abs(totalDebit - totalCredit) > 0.001) {
            return res.status(400).send("Total Debits must equal Total Credits.");
        }

        const prisma = queries.common.getPrisma();
        await prisma.$transaction(async (tx) => {
            // Need to pass the tx to postJournalEntry. Wait, postJournalEntry signature:
            // async postJournalEntry(tx, { description, reference, source, userId, entries })
            await queries.accounting.postJournalEntry(tx, {
                description,
                reference,
                source: 'manual',
                userId,
                entries: formattedEntries
            });
        });

        res.redirect('/accounting/transactions');
    } catch (error) {
        console.error("Error saving journal entry:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
};
