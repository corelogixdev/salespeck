const { Op, where } = require("sequelize");
var db = require("../models");
var moment = require("moment");
const { findLike } = require("../utils/searchquery");
const { getPaginationMeta } = require('../utils/paginationHelper');

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

  try {
    // Optimized count query - use raw SQL for better performance
    // Use COUNT(*) which is generally faster than COUNT(DISTINCT id) for primary keys
    let countQuery = 'SELECT COUNT(*) as count FROM sale s';
    const replacements = [];
    
    if (customer) {
      countQuery += ' INNER JOIN user u ON s.customer = u.id';
      countQuery += ' WHERE (u.firstname LIKE ? OR u.lastname LIKE ?)';
      const customerSearch = `%${customer}%`;
      replacements.push(customerSearch, customerSearch);
    }
    
    if (daterange) {
      const [start, end] = daterange.split(" to ");
      const startDate = moment(new Date(start)).startOf("day").toISOString();
      const endDate = moment(new Date(end)).endOf("day").toISOString();
      if (customer) {
        countQuery += ' AND s.createdAt >= ? AND s.createdAt <= ?';
      } else {
        countQuery += ' WHERE s.createdAt >= ? AND s.createdAt <= ?';
      }
      replacements.push(startDate, endDate);
    }
    
    if (productId) {
      countQuery += customer || daterange ? ' AND' : ' WHERE';
      countQuery += ' EXISTS (SELECT 1 FROM soldproducts sp WHERE sp.sale = s.id AND sp.product = ?)';
      replacements.push(productId);
    }
    
    // Build optimized sales query with raw SQL - much faster than Sequelize includes
    // Get sales with pagination first, then fetch product names separately for only these sales
    // SQL_CALC_FOUND_ROWS is deprecated in MySQL 8, so we use separate count query
    let salesQuery = `
      SELECT 
        s.id,
        s.invoicenum,
        s.discountpercentage,
        s.totalprice,
        s.totalpayment,
        s.createdAt
      FROM sale s
    `;
    
    const salesReplacements = [];
    const whereConditions = [];
    
    if (customer) {
      salesQuery += ' INNER JOIN user u ON s.customer = u.id';
      whereConditions.push('(u.firstname LIKE ? OR u.lastname LIKE ?)');
      const customerSearch = `%${customer}%`;
      salesReplacements.push(customerSearch, customerSearch);
    }
    
    if (daterange) {
      const [start, end] = daterange.split(" to ");
      const startDate = moment(new Date(start)).startOf("day").toISOString();
      const endDate = moment(new Date(end)).endOf("day").toISOString();
      whereConditions.push('s.createdAt >= ? AND s.createdAt <= ?');
      salesReplacements.push(startDate, endDate);
    }
    
    if (productId) {
      whereConditions.push('EXISTS (SELECT 1 FROM soldproducts sp2 WHERE sp2.sale = s.id AND sp2.product = ?)');
      salesReplacements.push(productId);
    }
    
    if (whereConditions.length > 0) {
      salesQuery += ' WHERE ' + whereConditions.join(' AND ');
    }
    
    salesQuery += `
      GROUP BY s.id, s.invoicenum, s.discountpercentage, s.totalprice, s.totalpayment, s.createdAt
      ORDER BY s.createdAt DESC
      LIMIT ? OFFSET ?
    `;
    salesReplacements.push(limit, offset);
    
    // Parallelize count and sales queries
    const [countResult, salesResult] = await Promise.all([
      db.sequelize.query(countQuery, {
        replacements,
        type: db.sequelize.QueryTypes.SELECT
      }),
      db.sequelize.query(salesQuery, {
        replacements: salesReplacements,
        type: db.sequelize.QueryTypes.SELECT
      })
    ]);
    
    const count = parseInt(countResult[0]?.count || 0);
    
    // Fetch product names separately for only the paginated sales (much faster)
    let productNamesMap = {};
    if (salesResult.length > 0) {
      const saleIds = salesResult.map(s => s.id);
      const placeholders = saleIds.map(() => '?').join(',');
      const productQuery = `
        SELECT 
          sp.sale,
          GROUP_CONCAT(DISTINCT p.name) as product_names
        FROM soldproducts sp
        INNER JOIN product p ON sp.product = p.id
        WHERE sp.sale IN (${placeholders})
        GROUP BY sp.sale
      `;
      
      const productResult = await db.sequelize.query(productQuery, {
        replacements: saleIds,
        type: db.sequelize.QueryTypes.SELECT
      });
      
      productResult.forEach(row => {
        productNamesMap[row.sale] = row.product_names ? row.product_names.split(',').map(n => n.trim()) : [];
      });
    }
    
    // Transform raw SQL results to match expected format
    const sales = salesResult.map(sale => ({
      id: sale.id,
      invoicenum: sale.invoicenum,
      discountpercentage: sale.discountpercentage,
      totalprice: sale.totalprice,
      totalpayment: sale.totalpayment,
      createdAt: sale.createdAt,
      SoldPoducts: (productNamesMap[sale.id] || []).slice(0, 5).map(name => ({
        Product: { name: name }
      }))
    }));
    
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
      searchquery: { ...req.body, ...req.query },
      pagination
    });
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.form = async (req, res) => {
  // OPTIMIZED: Don't load all customers upfront, use AJAX search instead
  // Only send empty array, customers will be loaded via searchCustomers endpoint
  res.render("sales/form", { customers: [], hidenav: true });
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

    // OPTIMIZED: Fetch all batches for all products in one query instead of N queries
    const allBatches = await db.productbatches.findAll({
      where: { product: allProductIds },
      order: [["product", "ASC"], ["createdAt", "ASC"]],
      transaction
    });

    // Group batches by product ID for efficient lookup
    const batchesByProduct = {};
    allBatches.forEach(batch => {
      if (!batchesByProduct[batch.product]) {
        batchesByProduct[batch.product] = [];
      }
      batchesByProduct[batch.product].push(batch);
    });

    // Prepare batch operations
    const batchUpdates = [];
    const batchDeletes = [];

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

      // Get batches for this product from grouped data
      let batches = batchesByProduct[orderProduct.productId] || [];

      let reducedQuantity = 0;
      let iteration = 0;
      while (reducedQuantity !== orderProduct.quantity && iteration < batches.length) {
        let batch = batches[iteration];
        if (batch.quantity > orderProduct.quantity - reducedQuantity) {
          batchUpdates.push({
            id: batch.id,
            quantityToReduce: orderProduct.quantity - reducedQuantity
          });
          reducedQuantity = orderProduct.quantity;
        } else {
          batchDeletes.push(batch.id);
          reducedQuantity += batch.quantity;
        }
        iteration++;
      }
    }

    // Execute batch updates and deletes
    if (batchUpdates.length > 0) {
      await Promise.all(batchUpdates.map(update =>
        db.productbatches.update(
          { quantity: db.sequelize.literal(`quantity - ${update.quantityToReduce}`) },
          {
            where: { id: update.id },
            transaction
          }
        )
      ));
    }

    if (batchDeletes.length > 0) {
      await db.productbatches.destroy({
        where: { id: batchDeletes },
        transaction
      });
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
  try {
    const { id } = req.params;
    if(!id) {
      return res.status(400).send({ status: "error", message: "Invalid sale ID" });
    }
    
    // Sale ID is STRING(32), not integer - don't use parseInt
    const sale = await db.sale.findOne({
      where: {
        id: id, // Use string ID directly
      },
      include: [
        {
          model: db.user,
          as: "Customer",
          attributes: ["id", "firstname", "lastname", "phone", "address"],
          required: false, // Left join in case customer is null
        },
        {
          model: db.user,
          as: "DeliveryUser",
          attributes: ["id", "firstname", "lastname", "phone", "address"],
          required: false, // Left join in case delivery user is null
        },
        {
          model: db.user,
          as: "User",
          attributes: ["id", "firstname", "lastname", "phone", "address"],
          required: false, // Left join in case user is null
        },
        {
          model: db.soldproducts,
          as: "SoldPoducts",
          required: false,
          include: [
            {
              model: db.product,
              as: "Product",
              required: false,
            },
          ],
        },
      ],
    });
    
    if (!sale) {
      return res.status(404).send({ status: "error", message: "Sale not found" });
    }
    
    let result = JSON.parse(JSON.stringify(sale));
    result.totalprice = parseFloat(result.totalprice || 0).toFixed(2);
    result.totalpayment = parseFloat(result.totalpayment || 0).toFixed(2);

    let totalPrice = parseFloat(result.totalprice || 0);
    let discount = parseFloat(result.discountpercentage || 0);
    let priceAfterDiscount = totalPrice - totalPrice * (discount / 100);

    let userPaid = parseFloat(result.totalpayment || 0);

    let change = userPaid - priceAfterDiscount;
    let balance = userPaid - priceAfterDiscount;

    result.balance = balance.toFixed(2);
    result.change = change.toFixed(2);

    let companySettings = await db.softwaresetting.findOne({
      where: {
        name: "company",
      },
    });
    
    if (!companySettings) {
      // Default company settings if not found
      companySettings = { value: JSON.stringify({
        name: 'Company Name',
        address: 'Company Address',
        phone: 'Company Phone',
        email: 'Company Email'
      })};
    }
    
    res.render("sales/saleview", {
      sale: result,
      companySettings: JSON.parse(companySettings.value),
      hidenav: true,
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
  // OPTIMIZED: Limit to 5 products for faster search results
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
    limit: 5, // Limit results to 5 products for faster performance
    order: [["name", "ASC"]] // Order by name for consistent results
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
