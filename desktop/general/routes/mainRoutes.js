const router = require("express").Router();
const mainController = require("../controllers/mainController");
const upload = require("../middleware/upload");
router.get("/", mainController.index);
router.get('/export-db', mainController.exportDb);
router.get("/register", mainController.registerget);
router.post("/register", upload.single('profileImage'), mainController.registerpost);
router.get("/dashboard", mainController.dashboard);
router.get("/switch-server", mainController.switchServer);
router.get("/inventorylogs", mainController.inventorylogs);
router.get('/inventorylogs/:id', mainController.inventorylogsById);
router.get('/inventorylogs', mainController.inventorylogs);
router.post('/inventorylogs/search', mainController.searchInventoryLogs);
router.get("/login", mainController.loginGet);
router.post("/login", mainController.loginPost);
router.get("/logout", mainController.logout);

module.exports = router;
