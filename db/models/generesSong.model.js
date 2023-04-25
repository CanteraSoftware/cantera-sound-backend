const { Model, DataTypes } = require('sequelize');

const GENERES_SONG_TABLE = 'generes-song'

const GeneresSongSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameGenere_songs: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class GeneresSong extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GENERES_SONG_TABLE,
      modelName: 'GeneresSong',
      timestamps: false
    }
  }
}

module.exports = { GENERES_SONG_TABLE, GeneresSongSchema, GeneresSong };   