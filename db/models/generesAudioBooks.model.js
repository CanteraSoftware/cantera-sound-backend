const { Model, DataTypes } = require('sequelize');

const GENERESAUDIOBOOKS_TABLE = 'categories'

const CategoriesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class Categories extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GENERESAUDIOBOOKS_TABLE,
      modelName: 'Categories',
      timestamps: false
    }
  }
}

module.exports = { GENERESAUDIOBOOKS_TABLE, CategoriesSchema, Categories }