const router = require('express').Router();
const sales = require('../controllers/salesController.js');
const { allowed } = require('../middleware/isAllowed.js');

router.get('/', allowed(['salesList']), sales.index);
router.get('/form', allowed(['salesCreate']), sales.form);
router.post('/save', allowed(['salesCreate']), sales.save);
router.post('/productsget', allowed(['salesCreate']), sales.productsget);
router.get('/:id', allowed(['salesView']), sales.saleview);
router.post('/search', allowed(['salesSearch']), sales.search);

module.exports = router;