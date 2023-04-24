const { Model, DataTypes } = require('sequelize');

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
  }
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