const router = require("express").Router();
const licenseController = require("../controllers/licenseController");

router.get("/activate", licenseController.activateGet);
router.post("/activate", licenseController.activatePost);
router.get("/status", licenseController.statusJson);

module.exports = router;
