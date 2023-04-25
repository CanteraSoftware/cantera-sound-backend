'use strict';

const { CATEGORIES_TABLE } = require('./../models/categories.model')
const { GENERES_AUDIOBOOKS_TABLE } = require('../models/categoriess.model')
const { GENERES_SONG_TABLE } = require('./../models/generesSong.model')
const { GENERES_PODCAST_TABLE } = require('../models/generesPodcast.model')
const { AUTHOR_TABLE } = require('./../models/author.model')
const { SONG_TABLE } = require('./../models/songs.model')
const { PODCAST_TABLE } = require('./../models/podcast.model')
const { AUDIOBOOKS_TABLE } = require('./../models/audioBooks.model')


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORIES_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      nameCategory: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }
    });
    await queryInterface.createTable(GENERES_SONG_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      nameGenere: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }
    });
    await queryInterface.createTable(GENERES_PODCAST_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      nameGenere: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
    await queryInterface.createTable(GENERES_AUDIOBOOKS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      nameGeneresAudioBooks: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }
    });
    await queryInterface.createTable(AUTHOR_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      nameAuthor: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        field: 'category_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: CATEGORIES_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
    await queryInterface.createTable(SONG_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      nameSong: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      authorId: {
        field: 'author_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: GENERES_SONG_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      song: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
    await queryInterface.createTable(PODCAST_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      namePodcast: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      authorId: {
        field: 'author_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: GENERES_PODCAST_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
    await queryInterface.createTable(AUDIOBOOKS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      nameAudioBooks: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      authorId: {
        field: 'author_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: GENERES_AUDIOBOOKS_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORIES_TABLE);
    await queryInterface.dropTable(GENERES_AUDIOBOOKS_TABLE);
    await queryInterface.dropTable(GENERES_SONG_TABLE);
    await queryInterface.dropTable(GENERES_PODCAST_TABLE);
    await queryInterface.dropTable(AUTHOR_TABLE);
    await queryInterface.dropTable(SONG_TABLE);
    await queryInterface.dropTable(PODCAST_TABLE);
    await queryInterface.dropTable(AUDIOBOOKS_TABLE);
  }
};
