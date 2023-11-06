"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("password_resets", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            token: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("password_resets");
    },
};
