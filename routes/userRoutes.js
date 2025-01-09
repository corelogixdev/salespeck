const userController = require('../controllers/userController');
const { allowed } = require('../middleware/isAllowed.js');
const router = require('express').Router();

router.get('/', allowed(['usersList']), userController.index);
router.post('/save', allowed(['usersCreate']), userController.save);
router.get('/form', allowed(['usersCreate']), userController.form);
router.post('/:id/delete', allowed(['usersDelete']), userController.delete);
router.get('/customers', allowed(['customersList']), userController.getCustomers);

module.exports = router;