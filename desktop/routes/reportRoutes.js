const router = require("express").Router();
const reportsController = require("../controllers/reportsController");
const { allowed } = require("../middleware/isAllowed.js");

router.get("/", allowed(["reportsView"]), reportsController.index);
router.get("/sales", allowed(["reportsView"]), reportsController.salesReport);
router.get("/purchases", allowed(["reportsView"]), reportsController.purchasesReport);
router.get("/inventory", allowed(["reportsView"]), reportsController.inventoryReport);
router.get("/customers", allowed(["reportsView"]), reportsController.customerReport);
router.get("/pdf-viewer", allowed(["reportsView"]), reportsController.pdfViewer);

module.exports = router;
