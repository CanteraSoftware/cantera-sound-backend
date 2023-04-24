const { Model, DataTypes } = require('sequelize');

const GENDERPODCAST_TABLE = 'genderpodcast'

const GenderPodcastSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameGenderPodcast: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class GenderPodcast extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GENDERPODCAST_TABLE,
      modelName: 'GenderPodcast',
      timestamps: false
    }
  }
}

module.exports = { GENDERPODCAST_TABLE, GenderPodcastSchema, GenderPodcast };   