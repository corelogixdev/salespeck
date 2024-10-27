'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create financeaccount table
    console.log('Creating tables...');
    await queryInterface.createTable('financeaccount', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      fk_parent_in_financeaccount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });


    // Create financetransaction table
    await queryInterface.createTable('financetransaction', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      details: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      fk_user_createdby_in_financetransaction: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fk_user_targetto_in_financetransaction: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fk_financeaccount_in_financetransaction: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });

    // Create product table
    await queryInterface.createTable('product', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      barcode: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      carrycost: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      discount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      purchaseprice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      purchaseactive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      saleprice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      saleactive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    });

    // Create productsub table
    await queryInterface.createTable('productsub', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fk_product_main_in_productsub: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fk_product_sub_in_productsub: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });

    // Create productsalepurchase table
    await queryInterface.createTable('productsalepurchase', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      fk_product_in_productsalepurchase: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fk_financetransaction_in_productsalepurchase: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });

    // Create softwaresetting table
    await queryInterface.createTable('softwaresetting', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      valuetype: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      stringvalue: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      intvalue: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      boolvalue: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      floatvalue: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      datevalue: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Create user table
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      phone2: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'user',
      },
    });

    // Create inventorylog table
    await queryInterface.createTable('inventorylog', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      note: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      fk_product_in_inventorylog: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });

    // Create cashclosing table
    await queryInterface.createTable('cashclosing', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      closingbalance: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      expence: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      note: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      sale: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      fk_user_in_cashclosing: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });

    // Add foreign keys and indexes
    await queryInterface.addConstraint('financeaccount', {
      fields: ['fk_parent_in_financeaccount'],
      type: 'foreign key',
      name: 'fk_parent_in_financeaccount',
      references: {
        table: 'financeaccount',
        field: 'id',
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('financetransaction', {
      fields: ['fk_user_createdby_in_financetransaction'],
      type: 'foreign key',
      name: 'fk_user_createdby_in_financetransaction',
      references: {
        table: 'user',
        field: 'id',
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('financetransaction', {
      fields: ['fk_user_targetto_in_financetransaction'],
      type: 'foreign key',
      name: 'fk_user_targetto_in_financetransaction',
      references: {
        table: 'user',
        field: 'id',
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('financetransaction', {
      fields: ['fk_financeaccount_in_financetransaction'],
      type: 'foreign key',
      name: 'fk_financeaccount_in_financetransaction',
      references: {
        table: 'financeaccount',
        field: 'id',
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('productsub', {
      fields: ['fk_product_main_in_productsub'],
      type: 'foreign key',
      name: 'fk_product_main_in_productsub',
      references: {
        table: 'product',
        field: 'id',
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('productsub', {
      fields: ['fk_product_sub_in_productsub'],
      type: 'foreign key',
      name: 'fk_product_sub_in_productsub',
      references: {
        table: 'product',
        field: 'id',
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('productsalepurchase', {
      fields: ['fk_product_in_productsalepurchase'],
      type: 'foreign key',
      name: 'fk_product_in_productsalepurchase',
      references: {
        table: 'product',
        field: 'id',
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('productsalepurchase', {
      fields: ['fk_financetransaction_in_productsalepurchase'],
      type: 'foreign key',
      name: 'fk_financetransaction_in_productsalepurchase',
      references: {
        table: 'financetransaction',
        field: 'id',
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('inventorylog', {
      fields: ['fk_product_in_inventorylog'],
      type: 'foreign key',
      name: 'fk_product_in_inventorylog',
      references: {
        table: 'product',
        field: 'id',
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('cashclosing', {
      fields: ['fk_user_in_cashclosing'],
      type: 'foreign key',
      name: 'fk_user_in_cashclosing',
      references: {
        table: 'user',
        field: 'id',
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('cashclosing');
    await queryInterface.dropTable('inventorylog');
    await queryInterface.dropTable('user');
    await queryInterface.dropTable('softwaresetting');
    await queryInterface.dropTable('productsalepurchase');
    await queryInterface.dropTable('productsub');
    await queryInterface.dropTable('product');
    await queryInterface.dropTable('financetransaction');
    await queryInterface.dropTable('financeaccount');
  },
};