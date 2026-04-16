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
    let data = req.body;
    const {
      totalPayment = 0,
      totalPrice: totalAmount = 0,
      vendor = null, // Vendor is explicitly allowed to be null
    } = data;
    let user = req.session.user.id;
    const randomInvoice = Math.floor(Math.random() * 1000000);
    
    // Source for tracking where the record was created
    const source = 'desktop';
    
    // Save purchase with vendor as optional
    let purchase = await queries.purchases.create({
      createdby: user,
      vendor,      // Can be null or undefined
      totalAmount,
      totalPayment,
      invoicenum: "INV-" + randomInvoice,
      source,
    });

    if (purchase) {
      let products = data.products;
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let purchasedProduct = await queries.purchases.createPurchasedProduct({
          purchase: purchase.id,
          product: product.productId,
          quantity: product.quantity,
          totalAmount: product.price,
          source,
        });

        // save the purchased batch
        if (product.expiryDate) {
          await queries.batches.create({
            product: product.productId,
            quantity: product.quantity,
            expirydate: product.expiryDate,
            source,
          });
        }

        if (purchasedProduct) {
          await queries.products.incrementQuantity(product.productId, product.quantity);
          // Log inventory
          await queries.inventory.createLog({
            product_id: product.productId,
            quantity: product.quantity,
            note: vendor ? "Purchased from vendor" : "Purchased",
            createdby: user,
            type: "purchase",
            vendor,  // Can be null
            source,
          });
        }
      }
      res.send({ status: "success", message: "Purchase saved successfully" });
    }
  } catch (error) {
    console.error("Error saving purchase:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
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
    vendorRequired: false,  // Add this flag to inform the view that vendor is not required
    hidenav: true,
  });
};
const {findLike} = require("../utils/searchquery");
exports.productsget = async (req, res) => {
  let body = req.body;
  let search = findLike(body);
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
