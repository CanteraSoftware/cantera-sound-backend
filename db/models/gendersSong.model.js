const { Model, DataTypes } = require('sequelize');

const GENDERSONG_TABLE = 'gendersong'

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
      tableName: GENDERSONG_TABLE,
      modelName: 'GenderSong',
      timestamps: false
    }
  }
}

module.exports = { GENDERSONG_TABLE, GenderSongSchema, GenderSong };   