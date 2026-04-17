const router = require("express").Router();
const reportsController = require("../controllers/reportsController");

router.get("/", reportsController.index);
router.get("/sales", reportsController.salesReport);
router.get("/purchases", reportsController.purchasesReport);
router.get("/inventory", reportsController.inventoryReport);
router.get("/customers", reportsController.customerReport);
router.get("/pdf-viewer", reportsController.pdfViewer);

module.exports = router;
