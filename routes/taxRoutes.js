const router = require("express").Router();
let db = require("../models");
const { getPaginationMeta, buildSortClause } = require('../utils/paginationHelper');

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || 10;

    const sortBy = query.sortBy || 'id';
    const sortOrder = query.sortOrder || 'asc';
    const order = buildSortClause(sortBy, sortOrder, 'id');

    const { count, rows: taxes } = await db.taxes.findAndCountAll({
      order,
      limit: pageSize,
      offset: (page - 1) * pageSize
    });

    const pagination = getPaginationMeta(page, pageSize, count);

    res.render("accounting/tax/index", {
      title: "Accounting",
      taxes,
      pagination,
      query,
      sortBy,
      sortOrder
    });
  } catch (error) {
    console.error('Error fetching taxes:', error);
    res.redirect("/dashboard");
  }
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
