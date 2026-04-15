'use strict';

const { json } = require('sequelize');
const { financeaccount, user, softwaresetting, product, taxes } = require('../models');
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

    // Use queryInterface to insert directly, avoiding model schema validation issues
    for (const account of financeAccounts) {
      // Check if account already exists by name (more reliable than ID since IDs are generated)
      const existing = await queryInterface.sequelize.query(
        `SELECT id FROM financeaccount WHERE LOWER(TRIM(name)) = LOWER(TRIM(:name)) AND LOWER(TRIM(type)) = LOWER(TRIM(:type))`,
        {
          replacements: { name: account.name, type: account.type },
          type: queryInterface.sequelize.QueryTypes.SELECT
        }
      );
      
      if (existing && Array.isArray(existing) && existing.length > 0) {
        // Skip if already exists
        console.log(`Skipping financeaccount ${account.name} (${account.type}) - already exists`);
      } else {
        // Insert new
        await queryInterface.bulkInsert('financeaccount', [account]);
        console.log(`Created financeaccount ${account.name} (${account.type})`);
      }
    }

    // software settings (only company - printer and api are in .settings file)
    const softwareSettings = [
      { id: generateId(32), name: 'company', value: JSON.stringify({
        name: 'Company Name',
        address: 'Company Address',
        phone: 'Company Phone',
        email: 'Company Email' }
      )},
    ];

    for (const setting of softwareSettings) {
      // Check if setting already exists by name (more reliable than ID)
      const existing = await softwaresetting.findOne({
        where: { name: setting.name }
      });
      
      if (existing) {
        // Skip if already exists
        console.log(`Skipping software setting ${setting.name} - already exists`);
      } else {
        // Insert new
        await softwaresetting.create(setting);
        console.log(`Created software setting ${setting.name}`);
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
