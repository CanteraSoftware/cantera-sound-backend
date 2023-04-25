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

<<<<<<< HEAD
module.exports = { AUDIOBOOKS_TABLE, AudioBooksSchema, AudioBooks }
=======
module.exports = { AUDIOBOOKS_TABLE, AudioBooksSchema, AudioBooks };
>>>>>>> 6845bf6beeca937f582b745702487c457386a112
