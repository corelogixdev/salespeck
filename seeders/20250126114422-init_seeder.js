'use strict';

const { json } = require('sequelize');
const { financeaccount, user, softwaresetting, product, taxes } = require('../models');
const { encrypt } = require('../utils/encrypt');
const { generateId } = require('../utils/idGenerator');

module.exports = {
  async up(queryInterface, Sequelize) {

    const financeAccounts = [
      { id: generateId(32), name: 'bank', type: 'asset', parent: null },
      { id: generateId(32), name: 'cash', type: 'asset', parent: null },
      { id: generateId(32), name: 'petty cash', type: 'asset', parent: null },
      { id: generateId(32), name: 'undeposited fund', type: 'asset', parent: null },
      { id: generateId(32), name: 'account receivable', type: 'asset', parent: null },
      { id: generateId(32), name: 'fixed', type: 'asset', parent: null },
      { id: generateId(32), name: 'current', type: 'asset', parent: null },
      { id: generateId(32), name: 'other', type: 'asset', parent: null },
      { id: generateId(32), name: 'inventory', type: 'asset', parent: null },
      { id: generateId(32), name: 'notes payable', type: 'liabitity', parent: null },
      { id: generateId(32), name: 'account payable', type: 'liabitity', parent: null },
      { id: generateId(32), name: 'tax payable', type: 'liabitity', parent: null },
      { id: generateId(32), name: 'salary payable', type: 'liabitity', parent: null },
      { id: generateId(32), name: 'owner equity', type: 'equity', parent: null },
      { id: generateId(32), name: 'share capital', type: 'equity', parent: null },
      { id: generateId(32), name: 'pos sale', type: 'income', parent: null },
      { id: generateId(32), name: 'sale', type: 'income', parent: null },
      { id: generateId(32), name: 'service sale', type: 'income', parent: null },
      { id: generateId(32), name: 'other', type: 'income', parent: null },
      { id: generateId(32), name: 'inventory gain', type: 'income', parent: null },
      { id: generateId(32), name: 'operating', type: 'expence', parent: null },
      { id: generateId(32), name: 'salary', type: 'expence', parent: null },
      { id: generateId(32), name: 'paid tax', type: 'expence', parent: null },
      { id: generateId(32), name: 'cgs', type: 'expence', parent: null },
      { id: generateId(32), name: 'discount', type: 'expence', parent: null },
      { id: generateId(32), name: 'other', type: 'expence', parent: null },
      { id: generateId(32), name: 'inventory loss', type: 'expence', parent: null }
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
      { id: generateId(32), name: 'api', value: JSON.stringify({
        update_url: 'https://gitlab.com/api/v4/projects/62990895/packages/generic/openmenu/release',
        CI_PROJECT_ID: 62990895,
        install_date: new Date().toISOString(),
        install_type: 'desktop'
      })},
    ];

    for (const setting of softwareSettings) {
      // run only when record not exist
      const record = await softwaresetting.findByPk(setting.id);
      if (!record) {
        await softwaresetting.upsert(setting);
      }
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
