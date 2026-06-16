const queries = require("../prisma/queries");
const moment = require("moment");
const { getPaginationMeta, buildSortClause } = require('../utils/paginationHelper');

exports.index = async (req, res) => {
  try {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || parseInt(query.limit) || 10;

    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder || 'desc';
    const order = buildSortClause(sortBy, sortOrder, 'createdAt');

    const { daterange, vendor, invoicenum } = query;
    const { count, rows: purchases } = await queries.purchases.list({
      page,
      pageSize,
      daterange,
      vendor: vendor?.trim(),
      invoicenum: invoicenum?.trim(),
      sortBy,
      sortOrder
    });

    const pagination = getPaginationMeta(page, pageSize, count);

    res.render("accounting/purchase/index", {
      title: "Purchases",
      purchases,
      query,
      pagination,
      sortBy,
      sortOrder
    });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getPurchase = async (req, res) => {
  try {
    const purchase = await queries.purchases.getById(req.params.id);

    if (!purchase) {
      return res.status(404).json({ success: false, message: "Purchase not found" });
    }

    res.json({ success: true, purchase });
  } catch (error) {
    console.error("Error fetching purchase:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.purchaseview = async (req, res) => {
  let purchase = await queries.purchases.getById(req.params.id);
  purchase.balance = purchase.totalPayment - purchase.totalAmount;
  let companySettings = await queries.common.getCompanySetting();
  res.render("accounting/purchase/view", {
    title: "Purchase Details",
    purchase,
    companySettings: JSON.parse(companySettings?.value),
    layout:false
  });
};

exports.purchaseDetails = async (req, res) => {
  let purchase = await queries.purchases.getById(req.params.id);
  purchase.balance = purchase.totalAmount - purchase.totalPayment;
  let companySettings = await queries.common.getCompanySetting();
  res.render("accounting/purchase/details", {
    title: "Purchase Details",
    purchase,
    companySettings: JSON.parse(companySettings?.value),
    hidenav: true,
  });
};

exports.save = async (req, res) => {
  try {
    const { products, vendor, discountpercentage, totalPayment, totalPrice, ledger, transactionDate, purchaseAccountId } = req.body;
    const { user } = res.locals;
    const source = 'desktop';

    if (!products || products.length === 0) {
      return res.status(400).send({ status: "error", message: "Please add products to the purchase" });
    }

    const purchase = await queries.purchases.createPurchaseTransaction({
      userId: user.id,
      vendor,
      discountpercentage,
      totalAmount: totalPrice,
      totalPayment,
      ledger,
      products,
      source,
      transactionDate,
      purchaseAccountId
    });

    res.send({ status: "success", message: "Purchase saved successfully", purchaseId: purchase.id });
  } catch (error) {
    console.error("Error saving purchase:", error);
    res.status(500).send({ status: "error", message: error.message || "Internal Server Error" });
  }
};

exports.search = async (req, res) => {
  const { vendor, daterange, invoicenum } = req.body;
  const params = new URLSearchParams();
  if (vendor) params.set('vendor', vendor.trim());
  if (daterange) params.set('daterange', daterange.trim());
  if (invoicenum) params.set('invoicenum', invoicenum.trim());
  res.redirect('/accounting/purchase?' + params.toString());
};

exports.form = async (_, res) => {
  let vendors = await queries.users.listByRole("vendor");
  res.render("accounting/purchase/form", {
    title: "Save Purchase",
    vendors,
    hidenav: false,
  });
};
const {findLike} = require("../utils/searchquery");
exports.productsget = async (req, res) => {
  let body = req.body;
  let search = findLike(body);
  search.is_service = false; // Exclude services from purchases
  if (req.body.barcode) {
    search = { ...search, barcode: req.body.barcode };
  }
  const data = await queries.products.findForPurchase(search);
  res.json(data);
};

exports.searchVendors = async (req, res) => {
  try {
    let { search } = req.query;
    search = search.trim();
    const vendors = await queries.users.searchByRole('vendor', search, 10);
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getNextInvoiceNum = async (req, res) => {
    try {
        const nextNum = await queries.helpers.getNextInvoiceNumber('PUR');
        res.json({ success: true, nextNum });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getExpenseAccounts = async (req, res) => {
    try {
        const accounts = await queries.accounting.getAccountsByParent('5100'); // COGS (Manufacturing)
        res.json({ success: true, accounts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
