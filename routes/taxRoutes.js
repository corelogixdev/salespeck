const router = require("express").Router();
let db = require("../models");
const { getPaginationMeta, buildSortClause } = require('../utils/paginationHelper');

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || 10;

    const sortBy = query.sortBy || 'name';
    const sortOrder = query.sortOrder || 'asc';
    const order = buildSortClause(sortBy, sortOrder, 'name');

    const where = {};
    if (query.name_like) {
      where.name = { [db.Sequelize.Op.like]: `%${query.name_like}%` };
    }

    const { count, rows: taxes } = await db.taxes.findAndCountAll({
      where,
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

router.get("/:id", async (req, res) => {
  try {
    const tax = await db.taxes.findByPk(req.params.id);
    if (!tax) {
      return res.status(404).json({ success: false, message: 'Tax not found' });
    }
    res.json({ success: true, tax });
  } catch (error) {
    console.error('Error fetching tax:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
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
    res.json({ success: true, message: "Tax saved successfully" });
  } catch (e) {
    res.json({ success: false, message: "Error saving tax" });
  }
});

router.post("/:id/delete", async (req, res) => {
  try {
    let tax = await db.taxes.findByPk(req.params.id);
    await tax.destroy();
    res.json({ success: true, message: "Tax deleted successfully" });
  } catch (e) {
    res.json({ success: false, message: "Error deleting tax" });
  }
});

module.exports = router;
