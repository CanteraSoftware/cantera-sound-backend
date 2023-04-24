const { Model, DataTypes } = require('sequelize');

const GENDERAUDIOBOOKS_TABLE = 'genderaudiobooks'

const GenderAudioBooksSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameGenderAudioBooks: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class GenderAudioBooks extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GENDERAUDIOBOOKS_TABLE,
      modelName: 'GenderAudioBooks',
      timestamps: false
    }
  }
}

module.exports = { GENDERAUDIOBOOKS_TABLE, GenderAudioBooksSchema, GenderAudioBooks };