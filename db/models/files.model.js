const { Model, DataTypes } = require('sequelize');

const { CATEGORIES_TABLE } = require('./categories.model');
const { GENDERS_TABLE } = require('./genders.model');

const FILES_TABLE = 'files'

const FilesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  namefile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nameauthor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageurl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileurl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryid: {
    field: 'categoryid',
    allowNull: false,
    type: DataTypes.INTEGER,
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
    type: DataTypes.INTEGER,
    references: {
      model: GENDERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Files extends Model {
  static associate(models) {
    //ACA SE SOLUCIONO EL ERROR
    // this.hasOne(models.Categories, { as: 'categories' });
    // this.hasMany(models.Genders, { as: 'genders' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: FILES_TABLE,
      modelName: 'Files',
      timestamps: false
    }
  }
}

module.exports = { FILES_TABLE, FilesSchema, Files };