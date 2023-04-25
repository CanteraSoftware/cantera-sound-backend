const { Model, DataTypes } = require('sequelize');

const GENDER_PODCAST_TABLE = 'genderpodcast'

const GenderPodcastSchema = {
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

class GenderPodcast extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GENDER_PODCAST_TABLE,
      modelName: 'GenderPodcast',
      timestamps: false
    }
  }
}

module.exports = { GENDER_PODCAST_TABLE, GenderPodcastSchema, GenderPodcast };   