var db = require("../models");
exports.index = async (req, res) => {
  let sales = await db.sale.findAll({});
  let salesa = await db.sale.findAll({
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
      }
    ],
  });
  console.log(salesa);
  res.render("sales/index", { sales, title: "Sales" });
};

exports.form = async (req, res) => {
  res.render("sales/form");
};

exports.save = async (req, res) => {
  const { customer, invoicenum, products, discountpercentage } = req.body;
  const { user } = res.locals;
  try {
    const sale = await db.sale.create({
      user: user.id,
      customer:customer??null,
      invoicenum,
      discountpercentage,
    });
    if (sale) {
      let result;
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        result = await db.soldproducts.create({
          sale: sale.id,
          product: product.productId,
          quantity: product.quantity,
        });
      }
      // sale.saleid = result.id;
      await sale.save();
      res.redirect("/sales");
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
