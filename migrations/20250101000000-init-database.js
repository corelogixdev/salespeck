'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('Creating tables...');

    // Create financeaccount table
    await queryInterface.createTable('financeaccount', {
      id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
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
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdby: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      updatedby: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      value: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Create financetransaction table
    await queryInterface.createTable('financetransaction', {
      id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
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
      createdby: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      updatedby: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fk_user_targetto_in_financetransaction: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fk_financeaccount_in_financetransaction: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Create user table
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
      },
      address: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      account_key: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      firstname: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      lastname: {
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
      createdby: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updatedby: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Create category table
    await queryInterface.createTable('category', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdby: {
        type: Sequelize.STRING(32),
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      updatedby: {
        type: Sequelize.STRING(32),
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create brand table
    await queryInterface.createTable('brand', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdby: {
        type: Sequelize.STRING(32),
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      updatedby: {
        type: Sequelize.STRING(32),
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create product table
    await queryInterface.createTable('product', {
      id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
      },
      barcode: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      brand: {
        type: Sequelize.STRING(50),
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
      ispurchaseable: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      issaleable: {
        type: Sequelize.BOOLEAN,
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
      taxid: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdby: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updatedby: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Create productsub table
    await queryInterface.createTable('productsub', {
      id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
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
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Create productsalepurchase table
    await queryInterface.createTable('productsalepurchase', {
      id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
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
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Create softwaresetting table
    await queryInterface.createTable('softwaresetting', {
      id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Create cashclosing table
    await queryInterface.createTable('cashclosing', {
      id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
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
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Create soldproducts table
    await queryInterface.createTable('soldproducts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(32)
      },
      sale: Sequelize.STRING(32),
      product: Sequelize.STRING(32),
      quantity: Sequelize.INTEGER,
      price: Sequelize.FLOAT,
      total: Sequelize.FLOAT,
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Create sale table
    await queryInterface.createTable('sale', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
      },
      user: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      customer: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      deliveryuser: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      invoicenum: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      discountpercentage: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      totalprice: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      totalpayment: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      createdby: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      updatedby: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Create inventorylogs table
    await queryInterface.createTable('inventorylogs', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      note: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      createdby: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

    // Create purchase table
    await queryInterface.createTable('purchase', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      createdby: {
        type: Sequelize.STRING(32),
        allowNull: true
      },
      updatedby: {
        type: Sequelize.STRING(32),
        allowNull: true
      },
      vendor: {
        type: Sequelize.STRING(32),
        allowNull: true
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      totalPayment: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      invoicenum: {
        type: Sequelize.STRING,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create purchasedproducts table
    await queryInterface.createTable('purchasedproducts', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      purchase: {
        type: Sequelize.STRING(32),
        allowNull: true
      },
      product: {
        type: Sequelize.STRING(32),
        allowNull: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create productbatches table
    await queryInterface.createTable('productbatches', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      product: {
        type: Sequelize.STRING(32),
        allowNull: true
      },
      expirydate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
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
    // Drop tables in reverse order
    await queryInterface.dropTable('productbatches');
    await queryInterface.dropTable('purchasedproducts');
    await queryInterface.dropTable('purchase');
    await queryInterface.dropTable('inventorylogs');
    await queryInterface.dropTable('sale');
    await queryInterface.dropTable('soldproducts');
    await queryInterface.dropTable('cashclosing');
    await queryInterface.dropTable('softwaresetting');
    await queryInterface.dropTable('productsalepurchase');
    await queryInterface.dropTable('productsub');
    await queryInterface.dropTable('product');
    await queryInterface.dropTable('brand');
    await queryInterface.dropTable('category');
    await queryInterface.dropTable('user');
    await queryInterface.dropTable('financetransaction');
    await queryInterface.dropTable('financeaccount');
  },
};
