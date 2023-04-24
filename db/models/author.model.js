const { Model, DataTypes } = require('sequelize');

const AUTHOR_TABLE = 'author'

const AuthorSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameAuthor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORIES_TABLE,
      key: 'id'
    }
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
}

class Author extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: AUTHOR_TABLE,
      modelName: 'Author',
      timestamps: false
    }
  }
}

module.exports = { AUTHOR_TABLE, AuthorSchema, Author };