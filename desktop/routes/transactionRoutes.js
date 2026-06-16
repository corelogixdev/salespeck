const router = require('express').Router();
const transactionController = require('../controllers/transactionController');
const { allowed } = require('../middleware/isAllowed.js');

router.get('/', allowed(['accountingView']), transactionController.index);
router.get('/form', allowed(['accountingCreate']), transactionController.form);
router.post('/save', allowed(['accountingCreate']), transactionController.save);

module.exports = router;
