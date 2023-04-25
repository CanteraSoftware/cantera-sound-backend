const { Model, DataTypes } = require('sequelize');

const GENDER_AUDIOBOOKS_TABLE = 'genderaudiobooks'

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
      tableName: GENDER_AUDIOBOOKS_TABLE,
      modelName: 'GenderAudioBooks',
      timestamps: false
    }
  }
}

module.exports = { GENDER_AUDIOBOOKS_TABLE, GenderAudioBooksSchema, GenderAudioBooks };