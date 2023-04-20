'use strict';

const { PRODUCT_TABLE } = require('./../models/product.model')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
