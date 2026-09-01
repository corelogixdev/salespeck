const router = require('express').Router();
const sales = require('../controllers/salesController.js');
const { allowed } = require('../middleware/isAllowed.js');

router.get('/', allowed(['salesList']), sales.index);
router.post('/', allowed(['salesSearch']), sales.index);
router.get('/api/:id', allowed(['salesView']), sales.getSale);
router.get('/form', allowed(['salesCreate']), sales.form);
router.get('/service-form', allowed(['salesCreate']), sales.serviceForm);
router.post('/save', allowed(['salesCreate']), sales.save);
router.post('/service-save', allowed(['salesCreate']), sales.saveService);
router.post('/productsget', allowed(['salesCreate']), sales.productsget);
router.post('/service-productsget', allowed(['salesCreate']), sales.serviceProductsget);
router.get('/next-invoice-num', sales.getNextInvoiceNum);
router.get('/next-service-invoice-num', sales.getNextServiceInvoiceNum);
router.get('/revenue-accounts', sales.getRevenueAccounts);
router.get('/search-customers', sales.searchCustomers);
router.get('/returns', allowed(['salesCreate']), sales.returnsForm);
router.get('/returns/lookup', allowed(['salesCreate']), sales.returnsLookup);
router.get('/returns/sale/:id', allowed(['salesCreate']), sales.returnsSaleData);
router.post('/returns/save', allowed(['salesCreate']), sales.returnsSave);
router.get('/returns/:id', allowed(['salesView']), sales.returnsView);
router.get('/:id', allowed(['salesView']), sales.saleview);
router.post('/bulk-resolve-services', allowed(['salesCreate']), sales.bulkResolveServices);
router.post('/create-single-service', allowed(['salesCreate']), sales.createSingleService);

module.exports = router;