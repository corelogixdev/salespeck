const queries = require('../prisma/queries');

exports.index = async (req, res) => {
    try {
        const expenses = await queries.accounting.getExpenses();
        res.render('accounting/expenses/index', {
            title: 'Expenses',
            expenses
        });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
};

exports.form = async (req, res) => {
    try {
        // Fetch all accounts to filter for expenses and payment accounts
        const prisma = queries.common.getPrisma();
        const accounts = await prisma.financeaccount.findMany({
            orderBy: { code: 'asc' }
        });

        // Filter for expense accounts
        const expenseAccounts = accounts.filter(acc => 
            (acc.type || '').toLowerCase() === 'expense' || 
            (acc.category || '').toLowerCase() === 'expense'
        );

        // Filter for payment accounts (Asset, Cash, Bank)
        const paymentAccounts = accounts.filter(acc => 
            (acc.type || '').toLowerCase() === 'asset' || 
            (acc.category || '').toLowerCase() === 'asset' ||
            (acc.name || '').toLowerCase().includes('cash') ||
            (acc.name || '').toLowerCase().includes('bank')
        );

        res.render('accounting/expenses/form', {
            title: 'New Expense',
            expenseAccounts,
            paymentAccounts
        });
    } catch (error) {
        console.error("Error loading expense form:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
};

exports.save = async (req, res) => {
    try {
        const { date, expenseAccountId, paymentAccountId, amount, description } = req.body;
        const userId = req.session?.user?.id || 'system';

        if (!date || !expenseAccountId || !paymentAccountId || !amount) {
            return res.status(400).send("Missing required fields");
        }

        await queries.accounting.createExpense({
            date,
            expenseAccountId,
            paymentAccountId,
            amount,
            description
        }, userId);

        res.redirect('/accounting/expenses');
    } catch (error) {
        console.error("Error saving expense:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
};
