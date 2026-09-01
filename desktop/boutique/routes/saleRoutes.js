const router = require('express').Router();
const sales = require('../controllers/salesController.js');
const { allowed } = require('../middleware/isAllowed.js');

router.get('/', allowed(['salesList']), sales.index);
router.post('/', allowed(['salesSearch']), sales.index);
router.get('/api/:id', allowed(['salesView']), sales.getSale);
router.get('/form', allowed(['salesCreate']), sales.form);
router.post('/save', allowed(['salesCreate']), sales.save);
router.post('/productsget', allowed(['salesCreate']), sales.productsget);
router.get('/next-invoice-num', sales.getNextInvoiceNum);
router.get('/revenue-accounts', sales.getRevenueAccounts);
router.get('/search-customers', sales.searchCustomers);
router.get('/returns', allowed(['salesCreate']), sales.returnsForm);
router.get('/returns/lookup', allowed(['salesCreate']), sales.returnsLookup);
router.get('/returns/sale/:id', allowed(['salesCreate']), sales.returnsSaleData);
router.post('/returns/save', allowed(['salesCreate']), sales.returnsSave);
router.get('/returns/:id', allowed(['salesView']), sales.returnsView);
router.get('/:id', allowed(['salesView']), sales.saleview);

module.exports = router;