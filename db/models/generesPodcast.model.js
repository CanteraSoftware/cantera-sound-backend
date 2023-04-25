const { Model, DataTypes } = require('sequelize');

const GENERES_PODCAST_TABLE = 'generes-podcast'

const GeneresPodcastSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameGenere_podcast: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class GeneresPodcast extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GENERES_PODCAST_TABLE,
      modelName: 'GeneresPodcast',
      timestamps: false
    }
  }
}

module.exports = { GENERES_PODCAST_TABLE, GeneresPodcastSchema, GeneresPodcast };   