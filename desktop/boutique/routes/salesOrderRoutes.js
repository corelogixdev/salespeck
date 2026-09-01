const router = require('express').Router();
const salesOrder = require('../controllers/salesOrderController');
const { allowed } = require('../middleware/isAllowed');

router.get('/', salesOrder.index);
router.get('/book', salesOrder.bookingForm);
router.post('/save', salesOrder.saveBooking);
router.get('/details/:id', salesOrder.details);
router.post('/status-update', salesOrder.updateStatus);
router.get('/job-ticket/:id', salesOrder.jobTicket);
router.get('/receipt/:id', salesOrder.customerReceipt);
router.get('/api/unfulfilled', salesOrder.getUnfulfilledOrders);
router.get('/api/details/:id', salesOrder.getOrderApi);

module.exports = router;
