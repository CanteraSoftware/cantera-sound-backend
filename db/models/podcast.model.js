const { Model, DataTypes } = require('sequelize');

const PODCAST_TABLE = 'podcast'

const PodcastSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  namePodcast: {
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
}

class Podcast extends Model {
  static associate(models) {
    //
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PODCAST_TABLE,
      modelName: 'Podcast',
      timestamps: false
    }
  }
}

module.exports = { PODCAST_TABLE, PodcastSchema, Podcast };   