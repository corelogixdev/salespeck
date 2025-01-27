const router = require('express').Router();

var productController = require('../controllers/productController');
const { allowed } = require('../middleware/isAllowed.js');

router.get('/', allowed(['productsList']), productController.index);
router.post('/', allowed(['productsList']), productController.index); // for search
router.post('/get', allowed(['productsList', 'productsView']), productController.get);
router.get('/form', allowed(['productsCreate']), productController.form);
router.post('/save', allowed(['productsCreate']), productController.save);
router.post('/:id/delete', allowed(['productsDelete']), productController.delete);
router.post('/search', allowed(['productsView']), productController.search);

router.get('/quantity/form/:id', productController.quantityForm);
router.post('/quantity/save', productController.saveQuantity);

module.exports = router;