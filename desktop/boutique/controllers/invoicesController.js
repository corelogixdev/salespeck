"use strict";

const queries = require("../prisma/queries");
const { getPaginationMeta } = require("../utils/paginationHelper");

exports.index = async (req, res) => {
  try {
    const query = { ...req.body, ...req.query };
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || 10;
    const type = query.type || "all";
    const printedStatus = query.printedStatus || "all";
    const search = (query.search || "").trim();
    const daterange = query.daterange || "";

    const { count, rows: invoices, stats } = await queries.invoices.listAll({
      type,
      printedStatus,
      search,
      daterange,
      page,
      pageSize,
    });

    const pagination = getPaginationMeta(page, pageSize, count);

    if (req.query.partial) {
      return res.render("invoices/_table_rows", {
        invoices,
        layout: false,
      });
    }

    res.render("invoices/index", {
      title: "Invoices Management",
      invoices,
      stats,
      query,
      pagination,
      type,
      printedStatus,
    });
  } catch (error) {
    console.error("Error fetching unified invoices:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.markPrinted = async (req, res) => {
  try {
    const { type, id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Missing transaction ID" });
    }
    const updated = await queries.invoices.markPrinted(type, id);
    res.json({ success: true, printCount: updated?.printCount || 1 });
  } catch (error) {
    console.error("Error marking invoice printed:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
