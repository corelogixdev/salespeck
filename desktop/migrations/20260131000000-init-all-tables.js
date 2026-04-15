'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create user table (no dependencies)
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      account_key: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      firstname: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      lastname: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      password: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      phone2: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      role: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'user'
      },
      createdby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updatedby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      },
      profile_image_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null
      },
      dashboard_config: {
        type: Sequelize.TEXT, // Store as JSON string
        allowNull: true,
        defaultValue: '{}'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create taxes table (no dependencies)
    await queryInterface.createTable('taxes', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      percentage: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create brand table (depends on user)
    await queryInterface.createTable('brand', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updatedby: {
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
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create category table (depends on user)
    await queryInterface.createTable('category', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updatedby: {
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
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create product table (depends on user, brand, category, taxes)
    await queryInterface.createTable('product', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      barcode: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: true
      },
      carrycost: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true
      },
      discount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      ispurchaseable: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      issaleable: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      purchaseactive: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      purchaseprice: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      saleactive: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      saleprice: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      taxid: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updatedby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'desktop'
      }
      // Note: product table has timestamps: false in model
    });

    // Create productsub table (depends on product)
    await queryInterface.createTable('productsub', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      fk_product_main_in_productsub: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fk_product_sub_in_productsub: {
        type: Sequelize.STRING,
        allowNull: true
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create productbatches table (depends on product)
    await queryInterface.createTable('productbatches', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      product: {
        type: Sequelize.STRING,
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
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create purchase table (depends on user)
    await queryInterface.createTable('purchase', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      createdby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updatedby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vendor: {
        type: Sequelize.STRING,
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
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create purchasedproducts table (depends on purchase, product)
    await queryInterface.createTable('purchasedproducts', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      purchase: {
        type: Sequelize.STRING,
        allowNull: true
      },
      product: {
        type: Sequelize.STRING,
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
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create sale table (depends on user)
    await queryInterface.createTable('sale', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      user: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      customer: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      deliveryuser: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      invoicenum: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      discountpercentage: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      totalprice: {
        type: Sequelize.STRING,
        allowNull: true
      },
      totalpayment: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      createdby: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      updatedby: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create soldproducts table (depends on sale, product)
    await queryInterface.createTable('soldproducts', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      sale: {
        type: Sequelize.STRING,
        allowNull: true
      },
      product: {
        type: Sequelize.STRING,
        allowNull: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create inventorylogs table (depends on product, user)
    await queryInterface.createTable('inventorylogs', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      product_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdby: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vendor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create financeaccount table (self-referential, depends on user)
    await queryInterface.createTable('financeaccount', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      fk_parent_in_financeaccount: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updatedby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      value: {
        type: Sequelize.NUMERIC,
        allowNull: true
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create financetransaction table (depends on user, financeaccount)
    await queryInterface.createTable('financetransaction', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: true
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING(15),
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      details: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      fk_user_targetto_in_financetransaction: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fk_financeaccount_in_financetransaction: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updatedby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create productsalepurchase table (depends on product, financetransaction)
    await queryInterface.createTable('productsalepurchase', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      fk_product_in_productsalepurchase: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fk_financetransaction_in_productsalepurchase: {
        type: Sequelize.STRING,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create cashclosing table (depends on user)
    await queryInterface.createTable('cashclosing', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      closingbalance: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      expence: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      note: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      sale: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      fk_user_in_cashclosing: {
        type: Sequelize.STRING,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create softwaresetting table (no dependencies, no timestamps)
    await queryInterface.createTable('softwaresetting', {
      id: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING(20),
        allowNull: true
      }
      // Note: softwaresetting table has timestamps: false in model
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation
    await queryInterface.dropTable('productsalepurchase');
    await queryInterface.dropTable('cashclosing');
    await queryInterface.dropTable('softwaresetting');
    await queryInterface.dropTable('financetransaction');
    await queryInterface.dropTable('financeaccount');
    await queryInterface.dropTable('inventorylogs');
    await queryInterface.dropTable('soldproducts');
    await queryInterface.dropTable('sale');
    await queryInterface.dropTable('purchasedproducts');
    await queryInterface.dropTable('purchase');
    await queryInterface.dropTable('productbatches');
    await queryInterface.dropTable('productsub');
    await queryInterface.dropTable('product');
    await queryInterface.dropTable('category');
    await queryInterface.dropTable('brand');
    await queryInterface.dropTable('taxes');
    await queryInterface.dropTable('user');
  }
};
