const { Op } = require('sequelize');
const db = require('../models');
const encrypt = require('../utils/encrypt');

exports.index = async (req, res) => {
  const data = await db.product.findAll({
  });
  res.render('products/index', { title: "Products", data });
};

exports.get = async (req, res) => {
  let body = req.body;
  const data = await db.product.findAll(body);
  res.json(data);
}

exports.form = async (req, res) => {
  const productId = req.query.id;
  let data = null;
  if (productId) {
    data = await db.product.findByPk(productId);
  }
  res.render('products/form', { title: data ? 'Edit product' : 'Create product', product:data });
};

exports.save = async (req, res) => {
  var body = req.body;
  let id = body.id;
  let data = {
    barcode: body.barcode,
    category: body.category,
    carrycost: body.carrycost * 1,
    discount: body.discount * 1,
    name: body.name,
    purchaseprice: body.purchaseprice * 1,
    purchaseactive: body.purchaseactive === 'on',
    quantity: body.quantity * 1,
    saleprice: body.saleprice * 1,
    saleactive: body.saleactive === 'on',
   }
  try {
    if (id) {
      await db.product.update(data, { where: { id } });
    } else {
      await db.product.create( data );
    }
    res.json({ success: true, redirectUrl: `/products` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  const product = await db.product.findByPk(req.params.id);
  await db.product.destroy({ where: { id: req.params.id } });
  res.redirect(`/products`);
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