const { Op } = require('sequelize');
const db = require('../models');
const encrypt = require('../utils/encrypt');

exports.index = async (req, res) => {
  const products = await db.product.findAll({
  });
  res.render('products/index', { title: "Products", products });
};

exports.form = async (req, res) => {
  const productId = req.query.id;
  let product = null;
  if (productId) {
    product = await db.product.findByPk(productId);
  }
  res.render('products/form', { title: product ? 'Edit product' : 'Create product', product });
};

exports.save = async (req, res) => {
  var { id, name, } = req.body;
  
  try {
    if (id) {
      await db.product.update({ name }, { where: { id } });
    } else {
      await db.product.create({ name });
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