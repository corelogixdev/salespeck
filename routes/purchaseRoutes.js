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
router.get('/search-vendors', controller.searchVendors);

module.exports = router;
