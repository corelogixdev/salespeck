const queries = require("../prisma/queries");
var moment = require("moment");
const { findLike } = require("../utils/searchquery");
const { getPaginationMeta } = require('../utils/paginationHelper');
const config = require("../installEnv");

exports.index = async (req, res) => {
  const query = { ...req.body, ...req.query };
  let { customer, daterange, productId, filter } = query;
  
  // Handle 'today' filter shortcut
  if (filter === 'today') {
     const today = moment().format('YYYY-MM-DD');
     daterange = `${today} to ${today}`;
  } else if (filter === 'last30') {
     const end = moment().format('YYYY-MM-DD');
     const start = moment().subtract(29, 'days').format('YYYY-MM-DD');
     daterange = `${start} to ${end}`;
  }
  
  const page = parseInt(query.page) || 1;
  const pageSize = parseInt(query.pageSize) || 10;
  const limit = pageSize;
  const offset = (page - 1) * limit;

  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder || 'desc';
  const allowedSortColumns = ['createdAt', 'discountpercentage', 'totalprice', 'totalpayment'];
  const sortColumn = allowedSortColumns.includes(sortBy) ? sortBy : 'createdAt';
  const sortDir = sortOrder.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

  try {
    const { count, rows: sales } = await queries.sales.listIndex({
      page,
      pageSize: limit,
      customer,
      daterange,
      productId,
      sortBy: sortColumn,
      sortOrder: sortDir.toLowerCase()
    });
    
    const pagination = getPaginationMeta(page, limit, count);

    if (req.query.partial) {
      return res.render("sales/_table_rows", {
        sales,
        layout: false
      });
    }

    res.render("sales/index", {
      sales,
      title: "Sales Report",
      query,
      pagination,
      sortBy,
      sortOrder
    });
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getSale = async (req, res) => {
  try {
    const sale = await queries.sales.getById(req.params.id);

    if (!sale) {
      return res.status(404).json({ success: false, message: "Sale not found" });
    }

    res.json({ success: true, sale });
  } catch (error) {
    console.error("Error fetching sale:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.form = async (req, res) => {
  // OPTIMIZED: Don't load all customers upfront, use AJAX search instead
  // Only send empty array, customers will be loaded via searchCustomers endpoint
  res.render("sales/form", { customers: [] });
};

exports.save = async (req, res) => {
  try {
    const { customer, products, discountpercentage, totalPayment, totalPrice, ledger, transactionDate, revenueAccountId } = req.body;
    const { user } = res.locals;
    const sale = await queries.sales.createSaleTransaction({
      userId: user.id,
      customer,
      discountpercentage,
      totalPayment,
      totalPrice,
      ledger,
      products,
      transactionDate,
      revenueAccountId
    });

    res.send({
      status: "success",
      message: "Sale created successfully",
      saleId: sale.id
    });

  } catch (error) {
    console.error("Sale creation error:", error);
    res.status(500).send({ status: "error", message: error.message || "Internal Server Error" });
  }
};

// Remove or comment out the existing search function since it's now merged
// exports.search = async (req, res) => { ... }

exports.saleview = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id) {
      return res.status(400).send({ status: "error", message: "Invalid sale ID" });
    }
    
    // Sale ID is STRING(32), not integer - don't use parseInt
    const sale = await queries.sales.getById(id);
    
    if (!sale) {
      return res.status(404).send({ status: "error", message: "Sale not found" });
    }
    
    let result = JSON.parse(JSON.stringify(sale));
    result.totalprice = parseFloat(result.totalprice || 0).toFixed(2);
    result.totalpayment = parseFloat(result.totalpayment || 0).toFixed(2);

    let totalPrice = parseFloat(result.totalprice || 0);
    let discount = parseFloat(result.discountpercentage || 0);
    let priceAfterDiscount = totalPrice - totalPrice * (discount / 100);

    let userPaid = parseFloat(result.totalpayment || 0);

    let change = userPaid - priceAfterDiscount;
    let balance = userPaid - priceAfterDiscount;

    result.balance = balance.toFixed(2);
    result.change = change.toFixed(2);

    let companySettings = await queries.common.getCompanySetting();
    
    if (!companySettings) {
      // Default company settings if not found
      companySettings = { value: JSON.stringify({
        name: 'Company Name',
        address: 'Company Address',
        phone: 'Company Phone',
        email: 'Company Email'
      })};
    }
    
    res.render("sales/saleview", {
      sale: result,
      companySettings: JSON.parse(companySettings.value),
      printerConfig: config.printer || {
        printer: '',
        paper: '58mm',
        width: 58,
        height: 200,
        fontSize: 12,
        silentPrinting: false,
        numberOfPrints: 1
      },
      hidenav: false,
      layout: false
    });
  } catch (error) {
    console.error("Error in saleview:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};
exports.productsget = async (req, res) => {
  let body = req.body;
  let search = findLike(body);
  if (req.body.barcode) {
    search = { ...search, barcode: req.body.barcode };
  }
  // OPTIMIZED: Limit to 5 products for faster search results
  let data = await queries.products.findForSale(search);
  const productIds = data.map((product) => product.id);
  const allBatches = await Promise.all(productIds.map((id) => queries.batches.listByProduct(id)));
  data = data.map((product, index) => ({
    ...product,
    Batch: allBatches[index]
  }));
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  // get the plain object of data
  data = JSON.parse(JSON.stringify(data));
  let datanew = data.map((product) => {
    let expired = product.Batch.reduce(
      (count, batch) =>
        new Date(batch.expirydate) < today ? count + batch.quantity : count,
      0
    );
    delete product.Batch;
    return { ...product, expired };
  });
  res.json(datanew);
};

exports.searchCustomers = async (req, res) => {
  try {
    let { search } = req.query;
    search = search.trim();
    const customers = await queries.users.searchByRole('customer', search, 10);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getNextInvoiceNum = async (req, res) => {
    try {
        const nextNum = await queries.helpers.getNextInvoiceNumber('SAL');
        res.json({ success: true, nextNum });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getRevenueAccounts = async (req, res) => {
    try {
        const accounts = await queries.accounting.getAccountsByParent('4100'); // Sales Revenue
        res.json({ success: true, accounts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
