'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order
    await queryInterface.dropTable('brand');
    await queryInterface.dropTable('category');
  }
};
