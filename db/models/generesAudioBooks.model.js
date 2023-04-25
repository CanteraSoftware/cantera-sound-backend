const { Model, DataTypes } = require('sequelize');

const GENERES_AUDIOBOOKS_TABLE = 'categories'

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
      tableName: GENERES_AUDIOBOOKS_TABLE,
      modelName: 'Categories',
      timestamps: false
    }
  }
}

module.exports = { GENERES_AUDIOBOOKS_TABLE, CategoriesSchema, Categories }