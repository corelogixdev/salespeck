'use strict';

const encrypt = require('../utils/encrypt');
const db = require('../models');
const User = db.user;

async function seedDemoData() {
  try {
    var user = await User.findOne({ where: { username: 'test' } });
    if (!user) {
      user = await User.create({
        firstname: 'Test',
        lastname: 'User',
        username: 'test',
        email: 'test@test.com',
        password: encrypt.encrypt('test'),
        role: 'branchmanager',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } else {
      //update
      await User.update({
        firstname: 'Test',
        lastname: 'User',
        username: 'test',
        email: 'test@test.com',
        password: encrypt.encrypt('test'),
        role: 'branchmanager',
        updatedAt: new Date()
      }, {
        where: { username: 'test' }
      });
    }

    // Create user permissions
    await db.userpermissions.destroy({ where: { user_id: user.id } });
    await db.userpermissions.create({ user_id: user.id, permission_id: 777 });
    const products = [
      {
        name: 'Milk 1L',
        barcode: '5901234123457',
        carrycost: 0.5,
        discount: 0,
        ispurchaseable: true,
        issaleable: true,
        purchaseprice: 0.8,
        purchaseactive: true,
        quantity: 50,
        saleprice: 1.2,
        saleactive: true,
        createdby: 1,
        updatedby: 1,
      },
      {
        name: 'Bread 500g',
        barcode: '5901234123458',
        carrycost: 0.3,
        discount: 0,
        ispurchaseable: true,
        issaleable: true,
        purchaseprice: 0.6,
        purchaseactive: true,
        quantity: 30,
        saleprice: 1.0,
        saleactive: true,
        createdby: 1,
        updatedby: 1,
      },
      {
        name: 'Coca-Cola 330ml',
        barcode: '5901234123459',
        carrycost: 0.2,
        discount: 0,
        ispurchaseable: true,
        issaleable: true,
        purchaseprice: 0.4,
        purchaseactive: true,
        quantity: 100,
        saleprice: 0.8,
        saleactive: true,
        createdby: 1,
        updatedby: 1,
      },
      {
        name: 'Apple',
        barcode: '5901234123460',
        carrycost: 0.1,
        discount: 0,
        ispurchaseable: true,
        issaleable: true,
        purchaseprice: 0.2,
        purchaseactive: true,
        quantity: 200,
        saleprice: 0.3,
        saleactive: true,
        createdby: 1,
        updatedby: 1,
      },
      {
        name: 'Chicken Breast 500g',
        barcode: '5901234123461',
        carrycost: 0.8,
        discount: 0,
        ispurchaseable: true,
        issaleable: true,
        purchaseprice: 2.5,
        purchaseactive: true,
        quantity: 20,
        saleprice: 4.0,
        saleactive: true,
        createdby: 1,
        updatedby: 1,
      }
    ];
    
    let productsCreated = 0;
    for (const product of products) {
      const existingProduct = await db.product.findOne({
        where: { barcode: product.barcode }
      });

      if (existingProduct) {
        continue;
      }
      
      await db.product.create({
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      productsCreated++;
    }
  } catch (error) {
    console.error('Error seeding demo data:', error);
    throw error;
  }
}

// Execute if this script is run directly
if (require.main === module) {
  seedDemoData()
    .then(() => {
      process.exit(0);
    })
    .catch(err => {
      console.error('Failed to seed demo data:', err);
      process.exit(1);
    });
} else {
  // Export for use as a module
  module.exports = seedDemoData;
}
