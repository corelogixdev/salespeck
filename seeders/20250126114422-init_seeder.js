'use strict';

const { json } = require('sequelize');
const { financeaccount, user, softwaresetting, product, permissions, userpermissions, taxes } = require('../models');
const { encrypt } = require('../utils/encrypt');
const { generateId } = require('../utils/idGenerator');

module.exports = {
  async up(queryInterface, Sequelize) {

    const financeAccounts = [
      { id: generateId(32), name: 'bank', type: 'asset', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'cash', type: 'asset', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'petty cash', type: 'asset', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'undeposited fund', type: 'asset', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'account receivable', type: 'asset', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'fixed', type: 'asset', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'current', type: 'asset', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'other', type: 'asset', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'inventory', type: 'asset', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'notes payable', type: 'liabitity', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'account payable', type: 'liabitity', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'tax payable', type: 'liabitity', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'salary payable', type: 'liabitity', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'owner equity', type: 'equity', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'share capital', type: 'equity', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'pos sale', type: 'income', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'sale', type: 'income', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'service sale', type: 'income', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'other', type: 'income', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'inventory gain', type: 'income', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'operating', type: 'expence', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'salary', type: 'expence', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'paid tax', type: 'expence', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'cgs', type: 'expence', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'discount', type: 'expence', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'other', type: 'expence', fk_parent_in_financeaccount: null },
      { id: generateId(32), name: 'inventory loss', type: 'expence', fk_parent_in_financeaccount: null }
    ];

    for (const account of financeAccounts) {
      await financeaccount.upsert(account);
    }

    // software settings
    const softwareSettings = [
      { id: generateId(32), name: 'company', value: JSON.stringify({
        name: 'Company Name',
        address: 'Company Address',
        phone: 'Company Phone',
        email: 'Company Email' }
      )},
      { id: generateId(32), name: 'printer', value: JSON.stringify(
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
      // run only when record not exist
      const record = await softwaresetting.findByPk(setting.id);
      if (!record) {
        await softwaresetting.upsert(setting);
      }
    }
    
    // permissions
    let _permissions = [
      { id: generateId(32), name: 'all', description: 'all' },
      { id: generateId(32), name: 'products', description: 'product' },
      { id: generateId(32), name: 'products.create', description: 'product create' },
      { id: generateId(32), name: 'products.update', description: 'product update' },
      { id: generateId(32), name: 'products.delete', description: 'product delete' },
      { id: generateId(32), name: 'products.view', description: 'product view' },
      { id: generateId(32), name: 'products.list', description: 'product list' },
      { id: generateId(32), name: 'products.search', description: 'product search' },
      { id: generateId(32), name:  'sales', description: 'sale' },
      { id: generateId(32), name:  'sales.create', description: 'sale create' },
      { id: generateId(32), name: 'sales.update', description: 'sale update' },
      { id: generateId(32), name: 'sales.delete', description: 'sale delete' },
      { id: generateId(32), name: 'sales.view', description: 'sale view' },
      { id: generateId(32), name: 'sales.list', description: 'sale list' },
      { id: generateId(32), name: 'sales.search', description: 'sale search' },
      { id: generateId(32), name: 'users', description: 'user' },
      { id: generateId(32), name: 'users.create', description: 'user create' },
      { id: generateId(32), name: 'users.update', description: 'user update' },
      { id: generateId(32), name: 'users.delete', description: 'user delete' },
      { id: generateId(32), name: 'users.view', description: 'user view' },
      { id: generateId(32), name: 'users.list', description: 'user list' },
      { id: generateId(32), name: 'users.search', description: 'user search' },
      { id: generateId(32), name: 'customers', description: 'customer' },
      { id: generateId(32), name: 'customers.create', description: 'customer create' },
      { id: generateId(32), name: 'customers.update', description: 'customer update' },
      { id: generateId(32), name: 'customers.delete', description: 'customer delete' },
      { id: generateId(32), name: 'customers.view', description: 'customer view' },
      { id: generateId(32), name: 'customers.list', description: 'customer list' },
      { id: generateId(32), name: 'customers.search', description: 'customer search' },
      { id: generateId(32), name: 'settings', description: 'setting' },
      { id: generateId(32), name: 'settings.create', description: 'setting create' },
      { id: generateId(32), name: 'settings.update', description: 'setting update' },
      { id: generateId(32), name: 'settings.delete', description: 'setting delete' },
      { id: generateId(32), name: 'settings.view', description: 'setting view' },
      { id: generateId(32), name: 'settings.list', description: 'setting list' },
      { id: generateId(32), name: 'settings.search', description: 'setting search' },
      { id: generateId(32), name: 'purchases', description: 'purchase' },
      { id: generateId(32), name: 'purchases.create', description: 'purchase create' },
      { id: generateId(32), name: 'purchases.update', description: 'purchase update' },
      { id: generateId(32), name: 'purchases.delete', description: 'purchase delete' },
      { id: generateId(32), name: 'purchases.view', description: 'purchase view' },
      { id: generateId(32), name: 'purchases.list', description: 'purchase list' },
      { id: generateId(32), name: 'purchases.search', description: 'purchase search' },
      { id: generateId(32), name: 'taxes', description: 'tax' },
      { id: generateId(32), name: 'taxes.create', description: 'tax create' },
      { id: generateId(32), name: 'taxes.update', description: 'tax update' },
      { id: generateId(32), name: 'taxes.delete', description: 'tax delete' },
      { id: generateId(32), name: 'taxes.view', description: 'tax view' },
      { id: generateId(32), name: 'taxes.list', description: 'tax list' },
      { id: generateId(32), name: 'taxes.search', description: 'tax search' },
      { id: generateId(32), name: 'categories', description: 'category' },
      { id: generateId(32), name: 'categories.create', description: 'category create' },
      { id: generateId(32), name: 'categories.update', description: 'category update' },
      { id: generateId(32), name: 'categories.delete', description: 'category delete' },
      { id: generateId(32), name: 'categories.view', description: 'category view' },
      { id: generateId(32), name: 'categories.list', description: 'category list' },
      { id: generateId(32), name: 'categories.search', description: 'category search' },
      { id: generateId(32), name: 'brands', description: 'brand' },
      { id: generateId(32), name: 'brands.create', description: 'brand create' },
      { id: generateId(32), name: 'brands.update', description: 'brand update' },
      { id: generateId(32), name: 'brands.delete', description: 'brand delete' },
      { id: generateId(32), name: 'brands.view', description: 'brand view' },
      { id: generateId(32), name: 'brands.list', description: 'brand list' },
      { id: generateId(32), name: 'brands.search', description: 'brand search' },
    ];

    for (const permission of _permissions) {
      await permissions.upsert(permission);
    }
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
