const { Model, DataTypes } = require('sequelize');

const AUDIOBOOKS_TABLE = 'audiobooks'

const AudioBooksSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameAudioBooks: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class AudioBooks extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: AUDIOBOOKS_TABLE,
      modelName: 'AudioBooks',
      timestamps: false
    }
  }
}

module.exports = { AUDIOBOOKS_TABLE, AudioBooksSchema, AudioBooks };
