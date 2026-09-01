const router = require('express').Router();
const settings = require('../controllers/settingsController.js');
const { allowed } = require('../middleware/isAllowed.js');

router.get('/', allowed(['all']), settings.index);
router.post('/save', allowed(['all']), settings.save);

module.exports = router;