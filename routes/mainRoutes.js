const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const mainController = require("../controllers/mainController");

router.get("/", mainController.index);
router.get("/dashboard", isAuthenticated, mainController.dashboard);
router.get("/login", mainController.loginGet);
router.post("/login", mainController.loginPost);
router.get("/logout", mainController.logout);

module.exports = router;
