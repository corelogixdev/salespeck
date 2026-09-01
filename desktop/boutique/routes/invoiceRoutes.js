"use strict";

const router = require("express").Router();
const invoices = require("../controllers/invoicesController");
const { allowed } = require("../middleware/isAllowed");

router.get("/", allowed(["salesList", "purchasesList"]), invoices.index);
router.post("/", allowed(["salesList", "purchasesList"]), invoices.index);
router.post("/mark-printed", invoices.markPrinted);

module.exports = router;
