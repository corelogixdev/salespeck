const { Op } = require("sequelize");
var db = require("../models");
exports.index = async (req, res) => {
  let sales = await db.sale.findAll({
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
        as: 'SoldPoducts',
        include: [
          {
            model: db.product,
            as: 'Product',
            attributes: ['name', 'saleprice'], // Fetch product name and price
          },
        ],
      },
    ],
    order: [['createdAt', 'DESC']],
    limit: 10,
  });
  res.render("sales/index", { sales, title: "Sales Report", searchquery: {} });
};

exports.form = async (req, res) => {
  res.render("sales/form");
};

exports.save = async (req, res) => {
  const { customer, products, discountpercentage, totalPayment } = req.body;
  const { user } = res.locals;
  const randomInvoice = Math.floor(Math.random() * 1000000);
  try {
    const sale = await db.sale.create({
      user: user.id,
      customer:customer? customer : null,
      discountpercentage,
      total: totalPayment,
      invoicenum: 'INV-' + randomInvoice,
    });
    if (sale) {
      let allProductIds = products.map((product) => product.productId);
      let allProducts = await db.product.findAll({
        where: {
          id: allProductIds,
        },
      });
      const saleProductsData = allProducts.map((product) => ({
        sale: sale.id,
        product: product.id,
        quantity: products.find((p) => Number.parseInt(p.productId) === product.id).quantity,
        price: product.saleprice,
      }));
      // Use bulkCreate for efficient insertion
      let result = await db.soldproducts.bulkCreate(saleProductsData);
      if(result){
        // Update product quantity
        for (let i = 0; i < allProducts.length; i++) {
          const product = allProducts[i];
          const productData = products.find((p) => Number.parseInt(p.productId) === product.id);
          product.quantity = product.quantity - productData.quantity;
          await product.save();
        }
      }
      res.redirect("/sales");
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.search = async (req, res) => {
  let { customer, daterange, productId } = req.body;

  const { sale, soldproducts, product, user } = db;

  try {
    // Initialize query options
    let queryOptions = {
      where: {},
      include: [
        {
          model: soldproducts,
          as: "SoldPoducts",
          include: [
            {
              model: product,
              as: "Product",
            },
          ],
        },
        {
          model: user,
          as: "Customer",
          where: {},
        },
      ],
    };
    // Filter by customer name if provided
    if (customer) {
      customer = customer.trim();
      queryOptions.include[1].where.name = {
        [Op.like]: `%${customer}%`, // Allows partial match
      };
    }

    if (daterange) {
      const [startDate, endDate] = daterange
        .split(" - ")
        .map((date) => new Date(date.trim()));
      queryOptions.where.createdAt = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (productId) {
      queryOptions.include[0].where = { product: productId };
    }

    const sales = await sale.findAll(queryOptions);

    // Render the sales index page
    res.  render("sales/index", { sales, title: "Sales Report", searchquery: req.body}, );
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).send("Internal Server Error");
  }
};


var moment = require("moment");
exports.saleview = async (req, res) => {
  const { id } = req.params;
  const sale = await db.sale.findOne({
    where: { id },
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
        as: 'SoldPoducts',
        include: [
          {
            model: db.product,
            as: 'Product',
          },
        ],
      },
    ],
  });
  //format date
  let result = JSON.parse(JSON.stringify(sale));
  result.createdAt = moment(result.createdAt).format("MMMM Do YYYY");
  // get all settings relatted to company
  let companySettings = await db.softwaresetting.findOne({
    where: {
      name: "company",
    },
  });
  res.render("sales/saleview", { sale:result, companySettings: JSON.parse(companySettings.value) });
}