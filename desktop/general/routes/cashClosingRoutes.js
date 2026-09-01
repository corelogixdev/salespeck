const router = require('express').Router();
const cashClosingController = require('../controllers/cashClosingController');
const { allowed } = require('../middleware/isAllowed.js');

// These routes will be mounted directly in accountingRoutes to match the layout links
router.get('/cash-closing', allowed(['accountingCreate']), cashClosingController.form);
router.post('/cash-closing/save', allowed(['accountingCreate']), cashClosingController.save);
router.get('/cash-closing-report', allowed(['accountingView']), cashClosingController.report);

module.exports = router;
