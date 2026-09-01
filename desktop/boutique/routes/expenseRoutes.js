const router = require('express').Router();
const expenseController = require('../controllers/expenseController');
const { allowed } = require('../middleware/isAllowed.js');

router.get('/', allowed(['accountingView']), expenseController.index);
router.get('/form', allowed(['accountingCreate']), expenseController.form);
router.post('/save', allowed(['accountingCreate']), expenseController.save);

module.exports = router;
