'use strict';

const { CATEGORIES_TABLE } = require('./../models/categories.model')
const { GENDERS_TABLE } = require('../models/genders.model')
const { FILES_TABLE } = require('./../models/files.model')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORIES_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      namecategory: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }
    });
    await queryInterface.createTable(GENDERS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      namegender: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }
    });
    await queryInterface.createTable(FILES_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      namefile: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      nameauthor: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      imageurl: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      fileurl: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      categoryid: {
        field: 'categoryid',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: CATEGORIES_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      genderid: {
        field: 'genderid',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: GENDERS_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORIES_TABLE);
    await queryInterface.dropTable(GENDERS_TABLE);
    await queryInterface.dropTable(FILES_TABLE);
  }
};
