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

    // Permissions removed - all users have full access

    // Create vendors
    const vendors = [
      {
        firstname: 'Vendor',
        lastname: 'One',
        username: 'vendor1',
        email: 'vendor1@example.com',
        password: encrypt.encrypt('vendor1'),
        role: 'vendor',
        phone: '555-0001',
        address: '123 Supplier Street, Vendor City',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Vendor',
        lastname: 'Two',
        username: 'vendor2',
        email: 'vendor2@example.com',
        password: encrypt.encrypt('vendor2'),
        role: 'vendor',
        phone: '555-0002',
        address: '456 Provider Road, Vendor Town',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const vendor of vendors) {
      const existingVendor = await User.findOne({ where: { username: vendor.username } });
      if (!existingVendor) {
        await User.create(vendor);
      } else {
        await User.update(vendor, { where: { username: vendor.username } });
      }
    }

    // Create customers
    const customers = [
      {
        firstname: 'Customer',
        lastname: 'One',
        username: 'customer1',
        email: 'customer1@example.com',
        password: encrypt.encrypt('customer1'),
        role: 'customer',
        phone: '555-1001',
        address: '789 Buyer Avenue, Customer City',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Customer',
        lastname: 'Two',
        username: 'customer2',
        email: 'customer2@example.com',
        password: encrypt.encrypt('customer2'),
        role: 'customer',
        phone: '555-1002',
        address: '101 Shopper Lane, Customer Town',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (const customer of customers) {
      const existingCustomer = await User.findOne({ where: { username: customer.username } });
      if (!existingCustomer) {
        await User.create(customer);
      } else {
        await User.update(customer, { where: { username: customer.username } });
      }
    }

    const products = [
      {
        name: 'a',
        barcode: 'a',
        carrycost: 0,
        discount: 0,
        ispurchaseable: true,
        issaleable: false,
        purchaseprice: 1,
        purchaseactive: true,
        quantity: 0,
        saleprice: 0,
        saleactive: false,
        createdby: 1,
        updatedby: 1,
      },
      {
        name: 'b',
        barcode: 'b',
        carrycost: 0,
        discount: 0,
        ispurchaseable: false,
        issaleable: true,
        purchaseprice: 0,
        purchaseactive: false,
        quantity: 0,
        saleprice: 2,
        saleactive: true,
        createdby: 1,
        updatedby: 1,
      },
      {
        name: 'c',
        barcode: 'c',
        carrycost: 0,
        discount: 0,
        ispurchaseable: true,
        issaleable: true,
        purchaseprice: 3,
        purchaseactive: true,
        quantity: 0,
        saleprice: 4,
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
    
    console.log('Demo data seeded successfully');
    
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
