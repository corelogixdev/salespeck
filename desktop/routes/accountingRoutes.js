const router = require('express').Router();
const taxeRoutes = require('./taxRoutes');
const purchaseRoutes = require('./purchaseRoutes');
const expenseRoutes = require('./expenseRoutes');
const transactionRoutes = require('./transactionRoutes');
const cashClosingRoutes = require('./cashClosingRoutes');
const accountingController = require('../controllers/accountingController');
const { allowed } = require('../middleware/isAllowed.js');

router.get('/', (req, res) => {
    res.redirect('/accounting/coa');
});

router.get('/coa', allowed(['accountingView']), accountingController.coa);
router.post('/coa/save', allowed(['accountingUpdate']), accountingController.saveAccount);
router.post('/coa/reset', allowed(['adminOnly']), accountingController.resetCOA);
router.post('/coa/:id/delete', allowed(['accountingDelete']), accountingController.deleteAccount);
router.get('/ledger/party/:id', allowed(['accountingView']), accountingController.getPartyLedger);
router.get('/balance-sheet', allowed(['accountingView']), accountingController.balanceSheet);
router.use('/taxes', taxeRoutes);
router.use('/purchase', purchaseRoutes);
router.use('/expenses', expenseRoutes);
router.use('/transactions', transactionRoutes);
router.use('/', cashClosingRoutes);

module.exports = router;