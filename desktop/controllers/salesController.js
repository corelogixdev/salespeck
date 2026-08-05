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
    
    let result = JSON.parse(JSON.stringify(sale));
    result.totalprice = parseFloat(result.totalprice || 0).toFixed(2);
    result.totalpayment = parseFloat(result.totalpayment || 0).toFixed(2);

    let totalPrice = parseFloat(result.totalprice || 0);
    let discount = parseFloat(result.discountpercentage || 0);
    let priceAfterDiscount = totalPrice - totalPrice * (discount / 100);

    let userPaid = parseFloat(result.totalpayment || 0);

    let change = userPaid > priceAfterDiscount ? userPaid - priceAfterDiscount : 0;
    let balance = priceAfterDiscount > userPaid ? priceAfterDiscount - userPaid : 0;

    result.balance = balance.toFixed(2);
    result.change = change.toFixed(2);

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
    if (result.customer && result.Customer) {
      try {
        const ledgerBalance = await queries.accounting.getPartyBalance(result.customer);
        customerBalance = ledgerBalance;
      } catch (e) {
        console.error('Could not fetch customer balance:', e.message);
      }
    }
    
    res.render("sales/saleview", {
      sale: result,
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

exports.serviceForm = async (req, res) => {
  res.render("sales/service_form", { customers: [] });
};

exports.saveService = async (req, res) => {
  try {
    const { customer, products, discountpercentage, totalPayment, totalPrice, ledger, transactionDate, revenueAccountId } = req.body;
    const { user } = res.locals;
    const sale = await queries.sales.createServiceSaleTransaction({
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
      message: "Service Sale created successfully",
      saleId: sale.id
    });

  } catch (error) {
    console.error("Service Sale creation error:", error);
    res.status(500).send({ status: "error", message: error.message || "Internal Server Error" });
  }
};

exports.getNextServiceInvoiceNum = async (req, res) => {
    try {
        const nextNum = await queries.helpers.getNextInvoiceNumber('SRV');
        res.json({ success: true, nextNum });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.serviceProductsget = async (req, res) => {
  let body = req.body;
  let search = findLike(body);
  if (req.body.barcode) {
    search = { ...search, barcode: req.body.barcode };
  }
  search = { ...search, is_service: true };
  let data = await queries.products.findForSale(search);
  // Optional: We could filter by category 'Service', but for now let's return all,
  // or let's assume the frontend will allow selecting existing products or creating new ones.
  data = JSON.parse(JSON.stringify(data));
  res.json(data);
};

exports.bulkResolveServices = async (req, res) => {
  try {
    const { services } = req.body;
    if (!services || !Array.isArray(services)) {
      return res.json({ success: false, message: 'Invalid services data' });
    }

    const resolvedProducts = [];
    const names = [...new Set(services.filter(s => s.name).map(s => s.name))];
    const existingProducts = await queries.products.findForSale({ name: { in: names } }, 5000);
    const existingMap = new Map(existingProducts.map(p => [p.name, p]));

    for (let item of services) {
      if (!item.name) continue;
      
      const product = existingMap.get(item.name);
      if (product) {
        resolvedProducts.push({
          id: product.id,
          name: product.name,
          saleprice: product.saleprice,
          qty: item.qty || 1,
          rate: item.rate !== '' ? item.rate : (product.saleprice || 0),
          isNew: false
        });
      } else {
        resolvedProducts.push({
          id: null,
          name: item.name,
          saleprice: item.rate || 0,
          qty: item.qty || 1,
          rate: item.rate || 0,
          isNew: true
        });
      }
    }

    res.json({ success: true, products: resolvedProducts });
  } catch (error) {
    console.error('Error resolving bulk services:', error);
    res.json({ success: false, message: error.message || 'Internal Server Error' });
  }
};

exports.createSingleService = async (req, res) => {
  try {
    const { name, rate } = req.body;
    if (!name) return res.json({ success: false, message: 'Name is required' });

    let product = await queries.products.findByName(name);
    if (!product) {
      const serviceCategory = await queries.categories.getOrCreateServiceCategory();
      const newProductData = {
        name: name,
        saleprice: rate || 0,
        is_service: true,
        saleactive: true,
        purchaseactive: false,
        quantity: 0,
        purchaseprice: 0,
        discount: 0,
        carrycost: 0,
        category: serviceCategory.id,
        createdby: req.session.user ? req.session.user.id : null
      };
      product = await queries.products.create(newProductData);
    }
    
    res.json({ success: true, product: { id: product.id, name: product.name, saleprice: product.saleprice } });
  } catch (error) {
    console.error('Error creating single service:', error);
    res.json({ success: false, message: error.message || 'Internal Server Error' });
  }
};
