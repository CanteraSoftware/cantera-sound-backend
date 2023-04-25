const { Model, DataTypes } = require('sequelize');

const GENERES_AUDIOBOOKS_TABLE = 'generes-audiobooks'

const GeneresAudioBooksSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameGenere_audiobooks: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class GeneresAudioBooks extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GENERES_AUDIOBOOKS_TABLE,
      modelName: 'GeneresAudioBooks',
      timestamps: false
    }
  }
}

module.exports = { GENERES_AUDIOBOOKS_TABLE, GeneresAudioBooksSchema, GeneresAudioBooks };