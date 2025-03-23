const { Op, where } = require("sequelize");
var db = require("../models");
var moment = require("moment");
const { findLike } = require("../utils/searchquery");
const { getPagination, getPagingData } = require('../utils/pagination');

exports.index = async (req, res) => {
  let { customer, daterange, productId } = req.body;
  const page = parseInt(req.query.page) || parseInt(req.body.page) || 1;
  const { limit, offset } = getPagination(page, 10);

  let queryOptions = {
    include: [
      {
        model: db.user,
        as: "Customer",
        attributes: ["id", "firstname", "lastname", "phone", "address"],
      },
      {
        model: db.user,
        as: "DeliveryUser",
        attributes: ["id", "firstname", "lastname", "phone", "address"],
      },
      {
        model: db.user,
        as: "User",
        attributes: ["id", "firstname", "lastname", "phone", "address"],
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
    limit,
    offset
  };

  try {
    if (customer) {
      queryOptions.include[0].where = {
        [Op.or]: [
          { firstname: { [Op.like]: `%${customer}%` } },
          { lastname: { [Op.like]: `%${customer}%` } },
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

    if (productId) {
      queryOptions.include[3].where = {
        product: !isNaN(productId) ? parseInt(productId) : null,
      };
    }

    const { count } = await db.sale.findAndCountAll({
      ...queryOptions,
      limit: undefined,
      offset: undefined,
      distinct: true,
      col: 'id'
    });
    
    const sales = await db.sale.findAll(queryOptions);
    
    const pagination = getPagingData(count, page, limit);

    res.render("sales/index", {
      sales,
      title: "Sales Report",
      searchquery: req.body,
      pagination
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
    attributes: ["id", "firstname", "lastname", "phone"],
  });
  res.render("sales/form", { customers, hidenav: true });
};

exports.save = async (req, res) => {
  const { customer, products, discountpercentage, totalPayment, totalPrice } = req.body;
  if (!products || products.length === 0) {
    return res.status(400).send({ status: "error", message: "Please add products to the sale" });
  }
  if (totalPayment < 0) {
    return res.status(400).send({ status: "error", message: "Invalid total payment" });
  }

  const transaction = await db.sequelize.transaction();

  try {
    // 1. First fetch all products and validate quantities in one pass
    const allProductIds = products.map(product => product.productId);
    const allProducts = await db.product.findAll({
      where: { id: allProductIds },
      transaction
    });

    // Validate all products before making any changes
    const saleProductsData = [];
    const inventoryUpdates = [];
    const { user } = res.locals;

    for (const orderProduct of products) {
      const dbProduct = allProducts.find(p => p.id === orderProduct.productId);
      if (!dbProduct) {
        await transaction.rollback();
        return res.status(400).send({ 
          status: "error", 
          message: `Product with ID ${orderProduct.productId} not found` 
        });
      }
      if (orderProduct.quantity > dbProduct.quantity) {
        await transaction.rollback();
        return res.status(400).send({ 
          status: "error", 
          message: `Insufficient stock for ${dbProduct.name}. Available: ${dbProduct.quantity}, Requested: ${orderProduct.quantity}` 
        });
      }

      // Prepare data for bulk operations
      saleProductsData.push({
        product: dbProduct.id,
        quantity: orderProduct.quantity,
        price: orderProduct.price
      });

      inventoryUpdates.push({
        id: dbProduct.id,
        quantity: dbProduct.quantity - orderProduct.quantity
      });
      
      let batches = await db.productbatches.findAll({
        where: { product: orderProduct.productId },
        order: [["createdAt", "ASC"]],
        transaction
      });

      let reducedQuantity = 0;
      let iteration = 0;
      while (reducedQuantity!==orderProduct.quantity && iteration < batches.length) {
        let batch = batches[iteration];
        if(batch.quantity > orderProduct.quantity - reducedQuantity){
          await db.productbatches.update(
            { quantity: db.sequelize.literal(`quantity - ${orderProduct.quantity - reducedQuantity}`) },
            {
              where: {
                id: batch.id,
              },
              transaction
            }
          );
          reducedQuantity = orderProduct.quantity;
        } else {
          await db.productbatches.destroy({
            where: {
              id: batch.id,
            },
            transaction
          });
          reducedQuantity += batch.quantity;
        }
        iteration++;
      }
    }

    // 2. Create sale record
    const sale = await db.sale.create({
      user: user.id,
      customer: customer || null,
      discountpercentage,
      totalpayment: totalPayment,
      totalprice: totalPrice,
      invoicenum: "INV-" + Math.floor(Math.random() * 1000000),
      createdby: user.id
    }, { transaction });

    // 3. Create all related records in bulk
    const soldProducts = saleProductsData.map(product => ({
      ...product,
      sale: sale.id
    }));

    await db.soldproducts.bulkCreate(soldProducts, { transaction });

    // 4. Update product quantities in bulk
    await Promise.all(inventoryUpdates.map(update => 
      db.product.update(
        { quantity: update.quantity },
        { where: { id: update.id }, transaction }
      )
    ));

    // 5. Create inventory logs in bulk
    await db.inventorylogs.bulkCreate(
      soldProducts.map(product => ({
        product_id: product.product,
        quantity: -product.quantity,
        note: "Sold",
        createdby: user.id,
        type: "sale"
      })),
      { transaction }
    );

    await transaction.commit();

    res.send({
      status: "success",
      message: "Sale created successfully",
      saleId: sale.id
    });

  } catch (error) {
    await transaction.rollback();
    console.error("Sale creation error:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

// Remove or comment out the existing search function since it's now merged
// exports.search = async (req, res) => { ... }

exports.saleview = async (req, res) => {
  const { id } = req.params;
  if(!id) {
    return res.status(400).send({ status: "error", message: "Invalid sale ID" });
  }
  const sale = await db.sale.findOne({
    where: {
      id: parseInt(id),
    },
    include: [
      {
        model: db.user,
        as: "Customer",
        attributes: ["id", "firstname", "lastname", "phone", "address"],
      },
      {
        model: db.user,
        as: "DeliveryUser",
        attributes: ["id", "firstname", "lastname", "phone", "address"],
      },
      {
        model: db.user,
        as: "User",
        attributes: ["id", "firstname", "lastname", "phone", "address"],
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

  let companySettings = await db.softwaresetting.findOne({
    where: {
      name: "company",
    },
  });
  res.render("sales/saleview", {
    sale: result,
    companySettings: JSON.parse(companySettings.value),
    hidenav: true,
    layout: false
  });
};
exports.productsget = async (req, res) => {
  let body = req.body;
  let search = findLike(body);
  if (req.body.barcode) {
    search = { ...search, barcode: req.body.barcode };
  }
  let data = await db.product.findAll({
    where: {
      ...search,
      quantity: { [Op.gt]: 0 },
      saleactive: true,
    },
    // include the related batch
    include: [
      {
        model: db.productbatches,
        as: "Batch",
        attributes: ["id", "expirydate", "quantity", "createdAt"],
      },
    ],
  });
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
    const customers = await db.user.findAll({
      where: {
        role: 'customer',
        [Op.or]: [
          { firstname: { [Op.like]: `%${search}%` } },
          { lastname: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } }
        ]
      },
      limit: 10
    });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
