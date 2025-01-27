const router = require('express').Router();
const taxeRoutes = require('./taxRoutes');
const purchaseRoutes = require('./purchaseRoutes');
router.get('/', (req, res) => {
    res.render('accounting/index', { title: 'Accounting' });
});
router.use('/taxes', taxeRoutes);
router.use('/purchase', purchaseRoutes);

module.exports = router;