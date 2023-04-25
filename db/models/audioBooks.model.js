const { Model, DataTypes } = require('sequelize');

const { GENERES_AUDIOBOOKS_TABLE } = require('./generesAudioBooks.model');

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
  },
  authorId: {
    field: 'author_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: AUTHOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  generoId: {
    field: 'genero_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GENERES_AUDIOBOOKS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
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
