const queries = require("../prisma/queries");
const moment = require("moment");
const { getPaginationMeta, buildSortClause } = require('../utils/paginationHelper');
const { attachTransactionFinancials } = require('../utils/financials');

exports.index = async (req, res) => {
  try {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || parseInt(query.limit) || 10;

    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder || 'desc';
    const order = buildSortClause(sortBy, sortOrder, 'createdAt');

    const { daterange, vendor, invoicenum } = query;
    const { count, rows: rawPurchases } = await queries.purchases.list({
      page,
      pageSize,
      daterange,
      vendor: vendor?.trim(),
      invoicenum: invoicenum?.trim(),
      sortBy,
      sortOrder
    });

    const purchases = rawPurchases.map(p => attachTransactionFinancials(p));
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

    attachTransactionFinancials(purchase, purchase.PurchasedItems);
    res.json({ success: true, purchase });
  } catch (error) {
    console.error("Error fetching purchase:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.purchaseview = async (req, res) => {
  let purchase = await queries.purchases.getById(req.params.id);
  if (!purchase) {
    return res.status(404).send("Purchase not found");
  }

  attachTransactionFinancials(purchase, purchase.PurchasedItems);
  let companySettings = await queries.common.getCompanySetting();

  // Fetch vendor's current outstanding balance
  let vendorBalance = null;
  if (purchase.vendor) {
    try {
      vendorBalance = await queries.accounting.getPartyBalance(purchase.vendor);
    } catch (e) {
      console.error('Could not fetch vendor balance:', e.message);
    }
  }

  res.render("accounting/purchase/view", {
    title: "Purchase Details",
    purchase,
    companySettings: JSON.parse(companySettings?.value || "{}"),
    vendorBalance,
    layout: false
  });
};

exports.purchaseDetails = async (req, res) => {
  let purchase = await queries.purchases.getById(req.params.id);
  if (!purchase) {
    return res.status(404).send("Purchase not found");
  }

  attachTransactionFinancials(purchase, purchase.PurchasedItems);
  let companySettings = await queries.common.getCompanySetting();
  res.render("accounting/purchase/details", {
    title: "Purchase Details",
    purchase,
    companySettings: JSON.parse(companySettings?.value || "{}"),
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


exports.serviceForm = async (_, res) => {
  let vendors = await queries.users.listByRole("vendor");
  res.render("accounting/purchase/service_form", {
    title: "Purchase Services",
    vendors,
    hidenav: false,
  });
};

exports.serviceSave = async (req, res) => {
  try {
    const { products, vendor, discountpercentage, totalPayment, totalPrice, ledger, transactionDate, purchaseAccountId } = req.body;
    const { user } = res.locals;
    const source = 'service-desktop';

    if (!products || products.length === 0) {
      return res.status(400).send({ status: "error", message: "Please add products/services to the purchase" });
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
      purchaseAccountId,
      invoicePrefix: 'PSRV'
    });

    res.send({ status: "success", message: "Service Purchase saved successfully", purchaseId: purchase.id });
  } catch (error) {
    console.error("Error saving service purchase:", error);
    res.status(500).send({ status: "error", message: error.message || "Internal Server Error" });
  }
};

exports.getNextServiceInvoiceNum = async (req, res) => {
    try {
        const nextNum = await queries.helpers.getNextInvoiceNumber('PSRV');
        res.json({ success: true, nextNum });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



exports.serviceProductsget = async (req, res) => {
  let body = req.body;
  let search = findLike(body);
  // Allow fetching both services and raw materials for service purchase invoices.
  if (req.body.barcode) {
    search = { ...search, barcode: req.body.barcode };
  }
  const data = await queries.products.findForPurchase(search);
  res.json({ data });
};

exports.bulkResolveServices = async (req, res) => {
  try {
    const { services } = req.body;
    if (!services || !Array.isArray(services)) {
      return res.json({ success: false, message: "Invalid services data" });
    }

    const resolvedProducts = [];
    const names = [...new Set(services.filter((s) => s.name).map((s) => s.name))];
    const existingProducts = await queries.products.findForSale({ name: { in: names } }, 5000);
    const existingMap = new Map(existingProducts.map((p) => [p.name, p]));

    for (const item of services) {
      if (!item.name) continue;

      const product = existingMap.get(item.name);
      if (product) {
        const defaultRate = product.purchaseprice ?? product.saleprice ?? 0;
        resolvedProducts.push({
          id: product.id,
          name: product.name,
          saleprice: product.saleprice,
          purchaseprice: product.purchaseprice ?? defaultRate,
          qty: item.qty || 1,
          rate: item.rate !== "" && item.rate !== undefined && item.rate !== null
            ? item.rate
            : defaultRate,
          isNew: false,
        });
      } else {
        resolvedProducts.push({
          id: null,
          name: item.name,
          saleprice: item.rate || 0,
          purchaseprice: item.rate || 0,
          qty: item.qty || 1,
          rate: item.rate || 0,
          isNew: true,
        });
      }
    }

    res.json({ success: true, products: resolvedProducts });
  } catch (error) {
    console.error("Error resolving bulk purchase services:", error);
    res.json({ success: false, message: error.message || "Internal Server Error" });
  }
};

exports.createSingleService = async (req, res) => {
  try {
    const { name, rate } = req.body;
    if (!name) return res.json({ success: false, message: "Name is required" });

    let product = await queries.products.findByName(name);
    if (!product) {
      const serviceCategory = await queries.categories.getOrCreateServiceCategory();
      const newProductData = {
        name,
        saleprice: 0,
        purchaseprice: rate || 0,
        is_service: true,
        saleactive: false,
        purchaseactive: true,
        quantity: 0,
        discount: 0,
        carrycost: 0,
        category: serviceCategory.id,
        createdby: req.session.user ? req.session.user.id : null,
      };
      product = await queries.products.create(newProductData);
    }

    res.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        saleprice: product.saleprice,
        purchaseprice: product.purchaseprice,
      },
    });
  } catch (error) {
    console.error("Error creating single purchase service:", error);
    res.json({ success: false, message: error.message || "Internal Server Error" });
  }
};
