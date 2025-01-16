'use strict';

const { json } = require('sequelize');
const { financeaccount, user, softwaresetting,product, permissions, userpermissions, taxes } = require('../models'); // Import models directly
const { encrypt } = require('../utils/encrypt');

module.exports = {
  async up(queryInterface, Sequelize) {

    const financeAccounts = [
      { id: 101, name: 'bank', type: 'asset', fk_parent_in_financeaccount: null },
      { id: 102, name: 'cash', type: 'asset', fk_parent_in_financeaccount: null },
      { id: 103, name: 'petty cash', type: 'asset', fk_parent_in_financeaccount: null },
      { id: 104, name: 'undeposited fund', type: 'asset', fk_parent_in_financeaccount: null },
      { id: 105, name: 'account receivable', type: 'asset', fk_parent_in_financeaccount: null },
      { id: 106, name: 'fixed', type: 'asset', fk_parent_in_financeaccount: null },
      { id: 107, name: 'current', type: 'asset', fk_parent_in_financeaccount: null },
      { id: 108, name: 'other', type: 'asset', fk_parent_in_financeaccount: null },
      { id: 109, name: 'inventory', type: 'asset', fk_parent_in_financeaccount: null },
      { id: 201, name: 'notes payable', type: 'liabitity', fk_parent_in_financeaccount: null },
      { id: 202, name: 'account payable', type: 'liabitity', fk_parent_in_financeaccount: null },
      { id: 203, name: 'tax payable', type: 'liabitity', fk_parent_in_financeaccount: null },
      { id: 204, name: 'salary payable', type: 'liabitity', fk_parent_in_financeaccount: null },
      { id: 301, name: 'owner equity', type: 'equity', fk_parent_in_financeaccount: null },
      { id: 302, name: 'share capital', type: 'equity', fk_parent_in_financeaccount: null },
      { id: 401, name: 'pos sale', type: 'income', fk_parent_in_financeaccount: null },
      { id: 402, name: 'sale', type: 'income', fk_parent_in_financeaccount: null },
      { id: 403, name: 'service sale', type: 'income', fk_parent_in_financeaccount: null },
      { id: 404, name: 'other', type: 'income', fk_parent_in_financeaccount: null },
      { id: 405, name: 'inventory gain', type: 'income', fk_parent_in_financeaccount: null },
      { id: 501, name: 'operating', type: 'expence', fk_parent_in_financeaccount: null },
      { id: 502, name: 'salary', type: 'expence', fk_parent_in_financeaccount: null },
      { id: 503, name: 'paid tax', type: 'expence', fk_parent_in_financeaccount: null },
      { id: 504, name: 'cgs', type: 'expence', fk_parent_in_financeaccount: null },
      { id: 509, name: 'discount', type: 'expence', fk_parent_in_financeaccount: null },
      { id: 510, name: 'other', type: 'expence', fk_parent_in_financeaccount: null },
      { id: 511, name: 'inventory loss', type: 'expence', fk_parent_in_financeaccount: null },
      { id: 1011, name: 'meezan bank', type: 'asset', fk_parent_in_financeaccount: 101 },
      { id: 1012, name: 'faisal bank', type: 'asset', fk_parent_in_financeaccount: 101 },
    ];

    for (const account of financeAccounts) {
      await financeaccount.upsert(account);
    }

    var pass = encrypt('admin@123');
    const users = [
      { id: 1, address: null, name: 'admin', password:  pass, username: 'admin', phone: '00000000000', phone2: null, role: 'admin' },
    ];

    for (const userRecord of users) {
      await user.upsert(userRecord);
    }

    // software settings
    const softwareSettings = [
      { id: 1, name: 'company', value: JSON.stringify({ 
        name: 'Company Name', 
        address: 'Company Address', 
        phone: 'Company Phone', 
        email: 'Company Email' }
      )},
      { id: 5, name: 'printer', value: JSON.stringify(
        {
          printer: 'printer', 
          paper: 'paper',
          width: 'width',
          height: 'height',
          fontSize: 'fontSize',
        }
      )},
    ];

    for (const setting of softwareSettings) {
      await softwaresetting.upsert(setting);
    }

    const dumyproducts = [
      { id: 1, name: 'test product 1', purchaseprice: 90, saleprice: 100, barcode: '111', saleactive: true,purchaseactive: true,quantity: 10 },
      { id: 2, name: 'test product 2', purchaseprice: 180, saleprice: 200, barcode: '222', saleactive: true,purchaseactive: true,quantity: 5 },
    ]
    for (const productobj of dumyproducts) {
      await product.upsert(productobj);
    }
    // permissions
    let _permissions =  [
      { id: 777, name: 'all', description: 'all' },

      { id: 1, name: 'products', description: 'product' },
      { id: 2, name: 'products.create', description: 'product create' },
      { id: 3, name: 'products.update', description: 'product update' },
      { id: 4, name: 'products.delete', description: 'product delete' },
      { id: 5, name: 'products.view', description: 'product view' },
      { id: 6, name: 'products.list', description: 'product list' },
      { id: 7, name: 'products.search', description: 'product search' },

      { id: 8, name:  'sales', description: 'sale' },
      { id: 9, name:  'sales.create', description: 'sale create' },
      { id: 10, name: 'sales.update', description: 'sale update' },
      { id: 11, name: 'sales.delete', description: 'sale delete' },
      { id: 12, name: 'sales.view', description: 'sale view' },
      { id: 13, name: 'sales.list', description: 'sale list' },
      { id: 14, name: 'sales.search', description: 'sale search' },

      { id: 15, name: 'users', description: 'user' },
      { id: 16, name: 'users.create', description: 'user create' },
      { id: 17, name: 'users.update', description: 'user update' },
      { id: 18, name: 'users.delete', description: 'user delete' },
      { id: 19, name: 'users.view', description: 'user view' },
      { id: 20, name: 'users.list', description: 'user list' },
      { id: 21, name: 'users.search', description: 'user search' },

      // customer
      { id: 22, name: 'customers', description: 'customer' },
      { id: 23, name: 'customers.create', description: 'customer create' },
      { id: 24, name: 'customers.update', description: 'customer update' },
      { id: 25, name: 'customers.delete', description: 'customer delete' },
      { id: 26, name: 'customers.view', description: 'customer view' },
      { id: 27, name: 'customers.list', description: 'customer list' },
      { id: 28, name: 'customers.search', description: 'customer search' },

      // settings
      { id: 29, name: 'settings', description: 'setting' },
      { id: 30, name: 'settings.create', description: 'setting create' },
      { id: 31, name: 'settings.update', description: 'setting update' },
      { id: 32, name: 'settings.delete', description: 'setting delete' },
      { id: 33, name: 'settings.view', description: 'setting view' },
      { id: 34, name: 'settings.list', description: 'setting list' },
      { id: 35, name: 'settings.search', description: 'setting search' },
    ];

    for (const permission of _permissions) {
      await permissions.upsert(permission);
    }

    userpermissions.create({ user_id: 1, permission_id: 777 });


    // in taxes table add vat with 18% and gst with 5%
    await taxes.create({ id: 1, name: 'vat', percentage: 18 });
    await taxes.create({ id: 2, name: 'gst', percentage: 5 });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
