const { Model, DataTypes } = require('sequelize');

const { GENERES_SONGS_TABLE } = require('./generesPodcast.model');
const { AUTHOR_TABLE } = require('./author.model');

const SONG_TABLE = 'songs'

const SongsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameSong: {
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
      model: GENERES_SONGS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  song: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}

class Songs extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: SONG_TABLE,
      modelName: 'Songs',
      timestamps: false
    }
  }
}

module.exports = { SONG_TABLE, SongsSchema, Songs };   