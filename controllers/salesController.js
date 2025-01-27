const { Op, where } = require("sequelize");
var db = require("../models");
exports.index = async (req, res) => {
  let { customer, daterange, productId } = req.body;

  let queryOptions = {
    include: [
      {
        model: db.user,
        as: "Customer",
        attributes: ["id", "name"],
      },
      {
        model: db.user,
        as: "DeliveryUser",
        attributes: ["id", "name"],
      },
      {
        model: db.user,
        as: "User",
        attributes: ["id", "name"],
      },
      {
        model: db.soldproducts,
        as: "SoldPoducts",
        include: [
          {
            model: db.product,
            as: "Product",
            attributes: ["name", "saleprice"],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit: 10,
  };

  try {
    if (customer) {
      queryOptions.include[0].where = {
        name: {
          [Op.like]: `%${customer}%`,
        },
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

    if (productId) {
      queryOptions.include[3].where = {
        product: !isNaN(productId) ? parseInt(productId) : null,
      };
    }

    const sales = await db.sale.findAll(queryOptions);
    res.render("sales/index", {
      sales,
      title: "Sales Report",
      searchquery: req.body,
    });
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.form = async (req, res) => {
  let customers = await db.user.findAll({
    where: {
      role: "customer",
    },
    attributes: ["id", "name"],
  });
  res.render("sales/form", { customers, hidenav: true });
};

exports.save = async (req, res) => {
  const { customer, products, discountpercentage, totalPayment, totalPrice } =
    req.body;
  if (!products || products.length === 0) {
    return res
      .status(400)
      .send({ status: "error", message: "Please add products to the sale" });
  }
  if (totalPayment < 0) {
    return res
      .status(400)
      .send({ status: "error", message: "Invalid total payment" });
  }
  const { user } = res.locals;
  const randomInvoice = Math.floor(Math.random() * 1000000);
  try {
    const sale = await db.sale.create({
      user: user.id,
      customer: customer ? customer : null,
      discountpercentage,
      totalpayment: totalPayment, // The amount user paid
      totalprice: totalPrice, // The total price of all products
      invoicenum: "INV-" + randomInvoice,
      createdby: user.id,
    });
    if (sale) {
      let allProductIds = products.map((product) => product.productId);
      let allProducts = await db.product.findAll({
        where: {
          id: allProductIds,
        },
      });
      const saleProductsData = allProducts.map((product) => {
        let p = products.find(
          (p) => Number.parseInt(p.productId) === product.id
        );
        return {
          sale: sale.id,
          product: product.id,
          quantity: p.quantity,
          price: p.price,
        };
      });
      let result = await db.soldproducts.bulkCreate(saleProductsData);
      if (result) {
        for (let i = 0; i < allProducts.length; i++) {
          const product = allProducts[i];
          const productData = products.find(
            (p) => Number.parseInt(p.productId) === product.id
          );

          // Update product quantity
          product.quantity = product.quantity - productData.quantity;
          await product.save();

          // Create inventory log entry for the sale
          await db.inventorylogs.create({
            product_id: product.id,
            quantity: -productData.quantity, // Negative quantity for sales
            note: "Sold",
            createdby: user.id,
            type: "sale",
          });
        }
      }
      res.send({
        status: "success",
        message: "Sale created successfully",
        saleId: sale.id,
      });
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

// Remove or comment out the existing search function since it's now merged
// exports.search = async (req, res) => { ... }

var moment = require("moment");
const { findLike } = require("../utils/searchquery");
exports.saleview = async (req, res) => {
  const { id } = req.params;
  const sale = await db.sale.findOne({
    where: {
      id: parseInt(id),
    },
    include: [
      {
        model: db.user,
        as: "Customer",
        attributes: ["id", "name", "phone", "address"],
      },
      {
        model: db.user,
        as: "DeliveryUser",
        attributes: ["id", "name", "phone", "address"],
      },
      {
        model: db.user,
        as: "User",
        attributes: ["id", "name", "phone", "address"],
      },
      {
        model: db.soldproducts,
        as: "SoldPoducts",
        include: [
          {
            model: db.product,
            as: "Product",
          },
        ],
      },
    ],
  });
  let result = JSON.parse(JSON.stringify(sale));
  result.totalprice = parseFloat(result.totalprice).toFixed(2);
  result.totalpayment = parseFloat(result.totalpayment).toFixed(2);

  let totalPrice = result.totalprice;
  let discount = result.discountpercentage;
  let priceAfterDiscount = totalPrice - totalPrice * (discount / 100);

  let userPaid = parseFloat(result.totalpayment);

  let change = userPaid - priceAfterDiscount;
  // if(change < 0) change = 0;

  let balance = userPaid - priceAfterDiscount; // 10
  // if(balance < 0) balance = 0;

  result.balance = balance.toFixed(2);
  result.change = change.toFixed(2);

  result.createdAt = moment(result.createdAt).format("MMMM Do YYYY");
  let companySettings = await db.softwaresetting.findOne({
    where: {
      name: "company",
    },
  });
  res.render("sales/saleview", {
    sale: result,
    companySettings: JSON.parse(companySettings.value),
    hidenav: true,
  });
};
exports.productsget = async (req, res) => {
  let body = req.body;
  let search = findLike(body);
  if (req.body.barcode) {
    search = { ...search, barcode: req.body.barcode };
  }
  const data = await db.product.findAll({
    where: {
      ...search,
      quantity: { [Op.gt]: 0 },
      saleactive: true,
    },
  });
  res.json(data);
};
