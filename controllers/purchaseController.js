const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");
const { getPagination, getPagingData } = require('../utils/pagination');

exports.index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const { limit, offset } = getPagination(page, 10);
  
  try {
    const { count, rows: purchases } = await db.purchase.findAndCountAll({
      include: [
        {
          model: db.user,
          as: "Vendor",
          attributes: ["firstname", "lastname"]
        }
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset
    });
    
    const pagination = getPagingData(count, page, limit);
    
    res.render("accounting/purchase/index", {
      title: "Purchases",
      purchases,
      searchquery: {},
      pagination
    });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).send("Internal Server Error");
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
  purchase.balance = purchase.totalAmount - purchase.totalPayment;
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
      vendor = null,
    } = data;
    let user = req.session.user.id;
    const randomInvoice = Math.floor(Math.random() * 1000000);
    // Save purchase
    let purchase = await db.purchase.create({
      createdby: user,
      vendor,
      totalAmount,
      totalPayment,
      invoicenum: "INV-" + randomInvoice,
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
        });

        // save the purchased batch
        if (product.expiryDate) {
          await db.productbatches.create({
            product: product.productId,
            quantity: product.quantity,
            expirydate: product.expiryDate,
            quantity: product.quantity,
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
            note: "Purchased",
            createdby: user,
            type: "purchase",
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
  let { vendor, daterange, invoicenum } = req.body;
  vendor = vendor ? vendor.trim() : '';
  daterange = daterange ? daterange.trim() : '';
  invoicenum = invoicenum ? invoicenum.trim() : '';
  
  const page = parseInt(req.query.page) || parseInt(req.body.page) || 1;
  const { limit, offset } = getPagination(page, 10);
  
  try {
    let queryOptions = {
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
      limit,
      offset,
      order: [["createdAt", "DESC"]]
    };

    if (vendor) {
      queryOptions.include[0].where = {
        [Op.or]: [
          { firstname: { [Op.like]: `%${vendor}%` } },
          { lastname: { [Op.like]: `%${vendor}%` } },
        ],
      };
    }

    if (daterange) {
      let [start, end] = daterange.split(" to ");
      start = moment(new Date(start)).startOf("day").toDate();
      end = moment(new Date(end)).endOf("day").toDate();
      queryOptions.where = {
        ...queryOptions.where,
        createdAt: {
          [Op.between]: [start, end],
        },
      };
    }

    if (invoicenum) {
      queryOptions.where = {
        ...queryOptions.where,
        invoicenum: {
          [Op.like]: `%${invoicenum}%`,
        },
      };
    }

    const { count } = await db.purchase.findAndCountAll({
      ...queryOptions,
      limit: undefined,
      offset: undefined,
      distinct: true,
      col: 'id'
    });
    
    const purchases = await db.purchase.findAll(queryOptions);
    
    const pagination = getPagingData(count, page, limit);

    res.render("accounting/purchase/index", {
      title: "Purchases",
      purchases,
      searchquery: req.body,
      pagination
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

exports.form = async (_, res) => {
  let vendors = await db.user.findAll({
    where: {
      role: "user",
    },
  });
  res.render("accounting/purchase/form", {
    title: "Save Purchase",
    vendors,
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
        role: 'user',
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
