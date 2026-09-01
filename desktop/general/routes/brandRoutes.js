const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

router.get('/', brandController.listBrands);
router.get('/:id', brandController.getBrand);
router.post('/save', brandController.saveBrand);
router.post('/update', brandController.saveBrand);
router.post('/delete', brandController.deleteBrand);
router.post('/search', brandController.searchBrands);

module.exports = router;
