'use strict';

const { SONG_TABLE } = require('./../models/songs.model')
const { PODCAST_TABLE } = require('./../models/podcast.model')
const { GENERES_AUDIOBOOKS_TABLE } = require('./../models/gendersAudioBooks.model')
const { GENDER_SONG_TABLE } = require('./../models/songs.model')
const { GENDER_PODCAST_TABLE } = require('./../models/songs.model')
const { GENDER_AUDIOBOOKS_TABLE } = require('./../models/songs.model')
const { CATEGORIES_TABLE } = require('./../models/songs.model')
const { AUTHOR_TABLE } = require('./../models/songs.model')
const { AUDIOBOOKS_TABLE } = require('./../models/songs.model')


module.exports = {
  async up(queryInterface, Sequelize) {
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
          model: GENERO_TABLE,
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
      }
    });
    await queryInterface.createTable(GENERES_AUDIOBOOKS_TABLE, {
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
    await queryInterface.createTable(GENDER_SONG_TABLE, {
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
    await queryInterface.createTable(GENDER_PODCAST_TABLE, {
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
    await queryInterface.createTable(GENDER_AUDIOBOOKS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      nameGenderAudioBooks: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }
    });
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
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(SONG_TABLE);
    await queryInterface.dropTable(PODCAST_TABLE);
    await queryInterface.dropTable(GENERES_AUDIOBOOKS_TABLE);
    await queryInterface.dropTable(GENDER_SONG_TABLE);
    await queryInterface.dropTable(GENDER_PODCAST_TABLE);
    await queryInterface.dropTable(GENDER_AUDIOBOOKS_TABLE);
    await queryInterface.dropTable(CATEGORIES_TABLE);
    await queryInterface.dropTable(AUTHOR_TABLE);
    await queryInterface.dropTable(AUDIOBOOKS_TABLE);
  }
};
