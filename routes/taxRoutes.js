const router = require("express").Router();
let db = require("../models");

router.get("/", async (_, res) => {
  let taxes = await db.taxes.findAll();
  res.render("accounting/tax/index", { title: "Accounting", taxes });
});

router.post("/save", async (req, res) => {
  try {
    let id = req.body.id;
    if (id) {
      let tax = await db.taxes.findByPk(id);
      tax.name = req.body.name;
      tax.percentage = req.body.percentage;
      await tax.save();
    } else {
      await db.taxes.create({
        name: req.body.name,
        percentage: req.body.percentage,
      });
    }
    res.send({ status: "success", message: "Tax saved successfully" });
  } catch (e) {
    res.send({ status: "error", message: "Error saving tax" });
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    let tax = await db.taxes.findByPk(req.params.id);
    await tax.destroy();
    res.send({ status: "success", message: "Tax deleted successfully" });
  } catch (e) {
    res.send({ status: "error", message: "Error deleting tax" });
  }
});

module.exports = router;
