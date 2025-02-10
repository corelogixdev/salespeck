const { Op } = require('sequelize');
const db = require('../models');
const { findLike } = require('../utils/searchquery');

exports.index = async (req, res) => {
  try {
    const { name, barcode, category } = req.body;
    let whereClause = {};

    // Build search criteria
    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }
    if (barcode) {
      whereClause.barcode = { [Op.like]: `%${barcode}%` };
    }
    if (category) {
      whereClause.category = { [Op.like]: `%${category}%` };
    }

    const data = await db.product.findAll({
      where: whereClause,
      order: [['id', 'DESC']],
      limit: 10
    });

    res.render('products/index', { 
      title: "Products", 
      data,
      searchParams: req.body 
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
    console.error('Error loading form data:', error);
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
    if(alreadyInSale) {
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
    const product = await db.product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.render('products/quantity-form', { 
      title: 'Add Product Quantity', 
      product,
      hidenav: true 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.saveQuantity = async (req, res) => {
  let { id, quantity, note } = req.body;
  
  if (!quantity) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please enter a valid quantity' 
    });
  }

  if (!note.trim()) {
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

    // Update product quantity
    await product.update({
      quantity: db.sequelize.literal(`quantity + ${quantity}`)
    });

    // Create inventory log
    await db.inventorylogs.create({
      product_id: id,
      quantity: quantity,
      note: note,
      createdby: req.session.user.id,
      type: 'manual'
    });

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