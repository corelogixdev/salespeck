'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('user', 'profile_image_url', {
            type: Sequelize.STRING(500),
            allowNull: true,
            defaultValue: null
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('user', 'profile_image_url');
    }
};
