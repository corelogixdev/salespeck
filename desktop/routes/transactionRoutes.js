const router = require('express').Router();
const transactionController = require('../controllers/transactionController');
const { allowed } = require('../middleware/isAllowed.js');

router.get('/', allowed(['accountingView']), transactionController.index);
router.get('/form', allowed(['accountingCreate']), transactionController.form);
router.post('/save', allowed(['accountingCreate']), transactionController.save);
router.get('/edit/:id', allowed(['accountingCreate']), transactionController.edit);
router.post('/update/:id', allowed(['accountingCreate']), transactionController.update);

module.exports = router;
