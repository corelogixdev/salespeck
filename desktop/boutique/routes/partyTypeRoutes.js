const partyTypeController = require('../controllers/partyTypeController');
const router = require('express').Router();

router.get('/', partyTypeController.index);
router.post('/save', partyTypeController.save);
router.post('/:id/delete', partyTypeController.delete);

module.exports = router;
