const router = require('express').Router();
const sales = require('../controllers/salesController.js');
const { allowed } = require('../middleware/isAllowed.js');

router.get('/', allowed(['salesList']), sales.index);
router.post('/', allowed(['salesSearch']), sales.index);
router.get('/api/:id', allowed(['salesView']), sales.getSale);
router.get('/form', allowed(['salesCreate']), sales.form);
router.post('/save', allowed(['salesCreate']), sales.save);
router.post('/productsget', allowed(['salesCreate']), sales.productsget);
router.get('/search-customers', sales.searchCustomers);
router.get('/:id', allowed(['salesView']), sales.saleview);

module.exports = router;