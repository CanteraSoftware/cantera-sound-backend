const { Model, DataTypes } = require('sequelize');

const GENDER_SONG_TABLE = 'gendersong'

const GenderSongSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameGenere: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class GenderSong extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GENDER_SONG_TABLE,
      modelName: 'GenderSong',
      timestamps: false
    }
  }
}

module.exports = { GENDER_SONG_TABLE, GenderSongSchema, GenderSong };   