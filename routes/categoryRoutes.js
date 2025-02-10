const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.listCategories);
router.post('/save', categoryController.saveCategory);
router.post('/update', categoryController.updateCategory);
router.post('/delete', categoryController.deleteCategory);
router.post('/search', categoryController.searchCategories);

module.exports = router;
