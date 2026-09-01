const queries = require('../prisma/queries');

exports.form = async (req, res) => {
    try {
        const prisma = queries.common.getPrisma();
        
        // Find Cash account
        const cashAcc = await prisma.financeaccount.findFirst({
            where: { name: { contains: 'Cash' }, type: 'asset' }
        });

        let expectedCash = 0;
        let openingCash = 0;
        let todayCashIn = 0;
        let todayCashOut = 0;

        if (cashAcc) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Fetch all ledger entries for the cash account
            const ledgers = await prisma.account_ledger.findMany({
                where: { account_id: cashAcc.id },
                include: { journal: true }
            });

            for (const entry of ledgers) {
                const debit = parseFloat(entry.debit) || 0;
                const credit = parseFloat(entry.credit) || 0;
                const entryDate = new Date(entry.journal.date);

                if (entryDate < today) {
                    openingCash += (debit - credit);
                } else {
                    todayCashIn += debit;
                    todayCashOut += credit;
                }
            }

            expectedCash = parseFloat(cashAcc.opening_balance || 0) + openingCash + todayCashIn - todayCashOut;
        }

        res.render('accounting/cashclosing/form', {
            title: 'Cash Closing',
            expectedCash: expectedCash.toFixed(2),
            todayCashIn: todayCashIn.toFixed(2),
            todayCashOut: todayCashOut.toFixed(2)
        });

    } catch (error) {
        console.error("Error loading cash closing form:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
};

exports.save = async (req, res) => {
    try {
        const { expectedCash, actualCash, note } = req.body;
        const userId = req.session?.user?.id || 'system';

        await queries.accounting.saveCashClosing({
            expectedCash,
            actualCash,
            note,
            userId
        });

        res.redirect('/accounting/cash-closing-report');
    } catch (error) {
        console.error("Error saving cash closing:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
};

exports.report = async (req, res) => {
    try {
        const prisma = queries.common.getPrisma();
        const closings = await prisma.cashclosing.findMany({
            orderBy: { date: 'desc' }
        });

        res.render('accounting/cashclosing/report', {
            title: 'Cash Closing Report',
            closings
        });
    } catch (error) {
        console.error("Error loading cash closing report:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
};
