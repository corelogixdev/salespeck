const db = require("../models");
const { Op } = require("sequelize");
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
    let whereClause = {};
    let includeOptions = [
      {
        model: db.user,
        as: "Vendor",
        attributes: ["id", "firstname", "lastname"],
        where: {},
      },
      {
        model: db.user,
        as: "Creator",
        attributes: ["id", "firstname", "lastname"],
        where: {},
      },
    ];

    if (daterange) {
      const [start, end] = daterange.split(" to ").map(d => d.trim());
      if (start && end) {
        whereClause.createdAt = {
          [Op.between]: [
            moment(new Date(start)).startOf("day").toDate(),
            moment(new Date(end)).endOf("day").toDate(),
          ],
        };
      }
    }

    if (vendor) {
      const vendorSearch = vendor.trim();
      includeOptions[0].where[Op.or] = [
        { firstname: { [Op.like]: `%${vendorSearch}%` } },
        { lastname: { [Op.like]: `%${vendorSearch}%` } },
      ];
    }

    if (invoicenum) {
      whereClause.invoicenum = { [Op.like]: `%${invoicenum.trim()}%` };
    }

    const { count, rows: purchases } = await db.purchase.findAndCountAll({
      where: whereClause,
      include: includeOptions,
      order,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      distinct: true,
      col: 'id'
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
    const purchase = await db.purchase.findOne({
      where: { id: req.params.id },
      include: [
        { model: db.user, as: "Vendor", attributes: ["id", "firstname", "lastname"] },
        { model: db.user, as: "Creator", attributes: ["id", "firstname", "lastname"] },
        {
          model: db.purchasedproducts,
          as: "PurchasedItems",
          include: [{ model: db.product, as: "Product", attributes: ["id", "name"] }]
        }
      ]
    });

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
  let purchase = await db.purchase.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: db.user,
        as: "Vendor",
      },
      {
        model: db.purchasedproducts,
        as: "PurchasedItems",
        include: [
          {
            model: db.product,
            as: "Product",
          },
        ],
      },
    ],
  });
  purchase.balance = purchase.totalPayment - purchase.totalAmount;
  let companySettings = await db.softwaresetting.findOne({
    where: {
      name: "company",
    },
  });
  res.render("accounting/purchase/view", {
    title: "Purchase Details",
    purchase,
    companySettings: JSON.parse(companySettings?.value),
    layout:false
  });
};

exports.purchaseDetails = async (req, res) => {
  let purchase = await db.purchase.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: db.user,
        as: "Vendor",
      },
      {
        model: db.purchasedproducts,
        as: "PurchasedItems",
        include: [
          {
            model: db.product,
            as: "Product",
          },
        ],
      },
    ],
  });
  purchase.balance = purchase.totalAmount - purchase.totalPayment;
  let companySettings = await db.softwaresetting.findOne({
    where: {
      name: "company",
    },
  });
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
    let purchase = await db.purchase.create({
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
        let purchasedProduct = await db.purchasedproducts.create({
          purchase: purchase.id,
          product: product.productId,
          quantity: product.quantity,
          totalAmount: product.price,
          source,
        });

        // save the purchased batch
        if (product.expiryDate) {
          await db.productbatches.create({
            product: product.productId,
            quantity: product.quantity,
            expirydate: product.expiryDate,
            source,
          });
        }

        if (purchasedProduct) {
          await db.product.update(
            {
              quantity: db.sequelize.literal(`quantity + ${product.quantity}`),
            },
            {
              where: {
                id: product.productId,
              },
            }
          );
          // Log inventory
          await db.inventorylogs.create({
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
  let vendors = await db.user.findAll({
    where: {
      role: "vendor",
    },
  });
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
  const data = await db.product.findAll({
    where: {
      ...search,
      purchaseactive: true,
    },
  });
  res.json(data);
};

exports.searchVendors = async (req, res) => {
  try {
    let { search } = req.query;
    search = search.trim();
    const vendors = await db.user.findAll({
      where: {
        role: 'vendor', // Changed from "user" to "vendor"
        [Op.or]: [
          { firstname: { [Op.like]: `%${search}%` } },
          { lastname: { [Op.like]: `%${search}%` } },
        ]
      },
      limit: 10
    });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
