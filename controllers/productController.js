const { Op } = require('sequelize');
const db = require('../models');
const { findLike } = require('../utils/searchquery');
const { getPaginationMeta, buildSortClause, sanitizeFilters } = require('../utils/paginationHelper');

exports.index = async (req, res) => {
  try {
    const query = req.query;

    // Pagination parameters
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || 50; // Default 50 for products

    // Build comprehensive filter
    const whereClause = {};

    // Name filter (partial match)
    if (query.name) {
      whereClause.name = { [Op.like]: `%${query.name}%` };
    }

    // Barcode filter (exact match recommended for performance)
    if (query.barcode) {
      whereClause.barcode = query.barcode;
    }

    // Category filter
    if (query.category) {
      whereClause.category = { [Op.like]: `%${query.category}%` };
    }

    // Brand filter
    if (query.brand) {
      whereClause.brand = { [Op.like]: `%${query.brand}%` };
    }

    // Price range filters
    if (query.price_min) {
      whereClause.saleprice = whereClause.saleprice || {};
      whereClause.saleprice[Op.gte] = parseFloat(query.price_min);
    }
    if (query.price_max) {
      whereClause.saleprice = whereClause.saleprice || {};
      whereClause.saleprice[Op.lte] = parseFloat(query.price_max);
    }

    // Stock status filter
    if (query.stock_status) {
      if (query.stock_status === 'out_of_stock') {
        whereClause.quantity = 0;
      } else if (query.stock_status === 'low_stock') {
        whereClause.quantity = { [Op.gt]: 0, [Op.lt]: 10 };
      } else if (query.stock_status === 'in_stock') {
        whereClause.quantity = { [Op.gte]: 10 };
      }
    }

    // Active status filters
    if (query.sale_active !== undefined && query.sale_active !== '') {
      whereClause.saleactive = query.sale_active === '1';
    }
    if (query.purchase_active !== undefined && query.purchase_active !== '') {
      whereClause.purchaseactive = query.purchase_active === '1';
    }

    // Sort parameters
    const sortBy = query.sortBy || 'id';
    const sortOrder = query.sortOrder || 'desc';
    const order = buildSortClause(sortBy, sortOrder, 'id');

    // Get total count and paginated data
    const { count, rows: data } = await db.product.findAndCountAll({
      where: whereClause,
      order,
      limit: pageSize,
      offset: (page - 1) * pageSize
    });

    // Generate pagination metadata
    const pagination = getPaginationMeta(page, pageSize, count);

    // Get brands and categories for filters
    const brands = await db.brand.findAll({
      where: { status: true },
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });

    const categories = await db.category.findAll({
      where: { status: true },
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });

    if (query.partial) {
      return res.render('products/_table_rows', {
        layout: false,
        data,
        categories
      });
    }

    res.render('products/index', {
      title: "Products",
      data,
      searchParams: query,
      pagination,
      query,
      sortBy,
      sortOrder,
      brands,
      categories
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    req.session.message = {
      type: "error",
      text: "An error occurred while fetching products."
    };
    res.redirect("/dashboard");
  }
};

exports.get = async (req, res) => {
  let body = req.body;
  const data = await db.product.findAll({
    where: {
      ...findLike(body),
      quantity: { [Op.gt]: 0 }
    }
  });
  res.json(data);
}

exports.form = async (req, res) => {
  try {
    const taxes = await db.taxes.findAll();
    const brands = await db.brand.findAll({
      where: { status: true },
      order: [['name', 'ASC']]
    });
    const categories = await db.category.findAll({
      where: { status: true },
      order: [['name', 'ASC']]
    });

    const productId = req.query.id;
    let data = null;
    if (productId) {
      data = await db.product.findByPk(productId, {
        include: [
          { model: db.brand, as: 'Brand' },
          { model: db.category, as: 'Category' }
        ]
      });
    }

    res.render('products/form', {
      title: data ? 'Edit product' : 'Create product',
      product: data,
      taxes,
      brands,
      categories
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.save = async (req, res) => {
  var body = req.body;
  let id = body.id;

  try {
    const product = await db.product.findOne({ where: { name: body.name } });
    if (product && product.id != id) {
      return res.status(400).json({ success: false, message: 'Product with this name already exists' });
    }
    const barcode = await db.product.findOne({ where: { barcode: body.barcode } });
    if (barcode && barcode.id != id && body.barcode.trim()) {
      return res.status(400).json({ success: false, message: 'Product with this barcode already exists' });
    }
    let data = {
      barcode: body.barcode,
      brand_id: body.brand_id,
      category_id: body.category_id,
      carrycost: body.carrycost * 1,
      discount: body.discount * 1,
      name: body.name,
      purchaseprice: body.purchaseprice * 1,
      purchaseactive: body.purchaseactive === 'on',
      quantity: body.quantity * 1,
      saleprice: body.saleprice * 1,
      saleactive: body.saleactive === 'on',
      createdby: req.session.user.id,
      taxid: body.taxid ? body.taxid : null,
      brand: body.brand,
      category: body.category
    }

    if (id) {
      delete data.quantity;
      await db.product.update(data, { where: { id } });
    } else {
      await db.product.create(data);
    }

    res.send({ success: true, message: 'Product saved successfully' });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  try {
    let alreadyInSale = await db.soldproducts.findOne({ where: { product: req.params.id } });
    if (alreadyInSale) {
      return res.status(400).json({ success: false, message: 'You cannot delete a product that is already in sale' });
    }
    await db.product.destroy({ where: { id: req.params.id } });
    res.send({ success: true, redirectUrl: `/products` });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.search = async (req, res) => {
  const searchdata = req.body.query;
  if (!searchdata) {
    return res.json({ success: false, data: [] });
  }
  const data = await db.product.findAll({
    where: {
      name: { [Op.like]: `%${searchdata}%` }
    },
    attributes: ['id', 'name', 'saleprice']
  });
  res.json({ success: true, data });
}

exports.quantityForm = async (req, res) => {
  try {
    const productId = req.params.id;
    // get type from search params 
    let type = req.query.type;
    const product = await db.product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.render('products/quantity-form', {
      title: 'Add Product Quantity',
      product,
      hidenav: true,
      type
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.saveQuantity = async (req, res) => {
  let { id, name, currentQuantity, quantity, note, expirydate } = req.body;

  if (quantity === undefined || isNaN(quantity)) {
    quantity = 0;
  }

  if (!note || !note.trim()) {
    note = 'Manual quantity update';
  }

  try {
    const product = await db.product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const oldQuantity = product.quantity;
    let baseQuantity = oldQuantity;

    if (currentQuantity !== undefined && currentQuantity !== '') {
      baseQuantity = parseFloat(currentQuantity);
    }

    quantity = parseFloat(quantity);
    const finalQuantity = baseQuantity + quantity;

    // Update product 
    let updateData = { quantity: finalQuantity };
    if (name) {
      updateData.name = name;
    }

    await product.update(updateData);

    // Create inventory log
    // We log the adjustment specified in the 'quantity' field, 
    // plus any correction made to 'currentQuantity'
    const totalAdjustment = finalQuantity - oldQuantity;

    await db.inventorylogs.create({
      product_id: id,
      quantity: totalAdjustment,
      note: note,
      createdby: req.session.user.id,
      type: 'manual'
    });

    // create or update productbatches
    if (quantity > 0) {
      await db.productbatches.create({
        product: id,
        quantity: quantity,
        expirydate: expirydate
      });
    } else {
      let batches = await db.productbatches.findAll({
        where: { product: id },
        order: [['createdAt', 'ASC']]
      });
      let iteration = 0, reducedQuantity = 0, absquantity = Math.abs(quantity);
      while (reducedQuantity !== absquantity && iteration < batches.length) {
        let batch = batches[iteration];
        if (batch.quantity > absquantity) {
          batch.quantity -= absquantity;
          reducedQuantity += absquantity;
          await batch.save();
        } else {
          reducedQuantity += batch.quantity;
          await batch.destroy();
        }
        iteration++;
      }
    }

    res.json({
      success: true,
      message: 'Product quantity updated successfully'
    });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};
