const router = require("express").Router();
const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

router.get("/", async (_, res) => {
  let purchases = await db.purchase.findAll({});
  res.render("accounting/purchase/index", {
    title: "Purchases",
    purchases,
    searchquery: {},
  });
});

router.get("/view/:id", async (req, res) => {
  let purchase = await db.purchase.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: db.user,
        as: "Vendor",
        attributes: ["id", "name", "phone", "address"],
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
  });
});

router.get("/details/:id", async (req, res) => {
  let purchase = await db.purchase.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: db.user,
        as: "Vendor",
        attributes: ["id", "name", "phone", "address"],
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
});

router.post("/save", async (req, res) => {
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
          totalAmount: totalAmount,
        });

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
});

router.post("/search", async (req, res) => {
  let { vendor, daterange, invoicenum } = req.body;
  vendor = vendor.trim();
  daterange = daterange.trim();
  invoicenum = invoicenum.trim();
  try {
    let queryOptions = {
      include: [
        {
          model: db.user,
          as: "Vendor",
          attributes: ["id", "name", "phone", "address"],
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
    };

    // Vendor name search
    if (vendor) {
      queryOptions.include[0].where = {
        name: {
          [Op.like]: `%${vendor}%`,
        },
      };
    }

    // Date range search
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

    // Invoice number search
    if (invoicenum) {
      queryOptions.where = {
        ...queryOptions.where,
        invoicenum: {
          [Op.like]: `%${invoicenum}%`,
        },
      };
    }

    const purchases = await db.purchase.findAll(queryOptions);
    res.render("accounting/purchase/index", {
      title: "Purchases",
      purchases,
      searchquery: req.body,
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
});

router.get("/form", async (_, res) => {
  let vendors = await db.user.findAll({
    where: {
      role: "user",
    },
    attributes: ["id", "name"],
  });
  res.render("accounting/purchase/form", {
    title: "Save Purchase",
    vendors,
    hidenav: true,
  });
});

module.exports = router;
