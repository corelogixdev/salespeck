const queries = require("../prisma/queries");
var moment = require("moment");
const { findLike } = require("../utils/searchquery");
const { getPaginationMeta } = require('../utils/paginationHelper');
const config = require("../installEnv");
const { attachTransactionFinancials } = require('../utils/financials');

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
    const { count, rows: rawSales } = await queries.sales.listIndex({
      page,
      pageSize: limit,
      customer,
      daterange,
      productId,
      sortBy: sortColumn,
      sortOrder: sortDir.toLowerCase()
    });

    const sales = rawSales.map(s => attachTransactionFinancials(s));
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

    attachTransactionFinancials(sale, sale.SoldPoducts);
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
    const { customer, products, discountpercentage, totalPayment, totalPrice, ledger, transactionDate, revenueAccountId, salesorder_id } = req.body;
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

    if (salesorder_id) {
      const { requirePrismaClient } = require('../utils/prismaClient');
      const prisma = requirePrismaClient();
      await prisma.sale.update({
        where: { id: sale.id },
        data: { salesorder_id }
      });
      await prisma.salesorder.update({
        where: { id: salesorder_id },
        data: { status: 'FULFILLED', updatedAt: new Date() }
      });
    }

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

exports.returnsForm = async (req, res) => {
  res.render("sales/returns/form", {
    title: "Sales Return",
    saleId: req.query.saleId || "",
  });
};

exports.returnsLookup = async (req, res) => {
  try {
    const q = String(req.query.q || "").trim();
    if (!q) {
      return res.json({ success: true, sales: [] });
    }
    const sales = await queries.sales.lookupSalesForReturn(q, 15);
    res.json({ success: true, sales });
  } catch (error) {
    console.error("Returns lookup error:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

exports.returnsSaleData = async (req, res) => {
  try {
    const sale = await queries.sales.getSaleForReturn(req.params.id);
    if (!sale) {
      return res.status(404).json({ success: false, message: "Sale not found" });
    }
    res.json({ success: true, sale });
  } catch (error) {
    console.error("Returns sale data error:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

exports.returnsSave = async (req, res) => {
  try {
    const { saleId, items, refundMode, note, ledger } = req.body;
    const { user } = res.locals;
    if (!saleId) {
      return res.status(400).json({ status: "error", message: "Sale ID is required" });
    }
    const result = await queries.sales.createSaleReturnTransaction({
      saleId,
      items,
      refundMode,
      note,
      userId: user.id,
      ledger,
    });
    res.json({
      status: "success",
      message: "Return created successfully",
      returnId: result.id,
      invoicenum: result.invoicenum,
      totalamount: result.totalamount,
    });
  } catch (error) {
    console.error("Sale return error:", error);
    res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
  }
};

exports.returnsView = async (req, res) => {
  try {
    const ret = await queries.sales.getSaleReturnById(req.params.id);
    if (!ret) {
      const wantsHtml = String(req.headers.accept || "").includes("text/html");
      if (wantsHtml) {
        req.session.message = { type: "error", text: "Return not found" };
        return res.redirect("/sales/returns");
      }
      return res.status(404).json({ status: "error", message: "Return not found" });
    }

    let companySettings = await queries.common.getCompanySetting();
    if (!companySettings) {
      companySettings = { value: JSON.stringify({ name: "Company", address: "", phone: "" }) };
    }

    res.render("sales/returns/view", {
      ret,
      companySettings: JSON.parse(companySettings.value),
      layout: false,
    });
  } catch (error) {
    console.error("Error in returnsView:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.saleview = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id) {
      return res.status(400).send({ status: "error", message: "Invalid sale ID" });
    }
    
    // Sale ID is STRING(32), not integer - don't use parseInt
    const sale = await queries.sales.getById(id);
    
    if (!sale) {
      // Browser navigations should not see raw JSON (e.g. old /sales/returns link)
      const wantsHtml = !req.xhr && (req.headers.accept || '').includes('text/html');
      if (wantsHtml) {
        req.session.message = { type: 'error', text: 'Sale not found.' };
        return res.redirect('/sales');
      }
      return res.status(404).send({ status: "error", message: "Sale not found" });
    }
    
    attachTransactionFinancials(sale, sale.SoldPoducts);
    let companySettings = await queries.common.getCompanySetting();
    
    if (!companySettings) {
      companySettings = { value: JSON.stringify({
        name: 'Company Name',
        address: 'Company Address',
        phone: 'Company Phone',
        email: 'Company Email'
      })};
    }

    // Fetch customer's current outstanding balance
    let customerBalance = null;
    if (sale.customer && sale.Customer) {
      try {
        const ledgerBalance = await queries.accounting.getPartyBalance(sale.customer);
        customerBalance = ledgerBalance;
      } catch (e) {
        console.error('Could not fetch customer balance:', e.message);
      }
    }
    
    res.render("sales/saleview", {
      sale: sale,
      companySettings: JSON.parse(companySettings.value),
      customerBalance,
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
  search = { ...search, is_service: false };
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
