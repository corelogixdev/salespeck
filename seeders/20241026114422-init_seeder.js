'use strict';

const { financeaccount, user } = require('../models'); // Import models directly
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
