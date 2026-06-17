const router = require("express").Router();
const controller = require("../controllers/purchaseController");

router.get("/", controller.index);
router.get("/api/:id", controller.getPurchase);
router.get("/view/:id", controller.purchaseview);
router.get("/details/:id", controller.purchaseDetails);
router.post("/save", controller.save);
router.post("/search", controller.search);
router.get("/form", controller.form);
router.post("/productsget", controller.productsget);
router.get("/next-invoice-num", controller.getNextInvoiceNum);
router.get("/expense-accounts", controller.getExpenseAccounts);
router.get('/search-vendors', controller.searchVendors);

// Service Purchase Routes
router.get("/service-form", controller.serviceForm);
router.post("/service-save", controller.serviceSave);
router.post("/service-productsget", controller.serviceProductsget);
router.get("/next-service-invoice-num", controller.getNextServiceInvoiceNum);

module.exports = router;
