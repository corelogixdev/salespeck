const router = require('express').Router();
const taxeRoutes = require('./taxRoutes');

router.get('/', (req, res) => {
    res.render('accounting/index', { title: 'Accounting' });
});
router.use('/taxes', taxeRoutes)

module.exports = router;