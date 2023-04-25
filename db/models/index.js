const { Categories, CategoriesSchema } = require('./categories.model');
const { GeneresAudioBooks, GeneresAudioBooksSchema } = require('./generesAudioBooks.model');
const { GeneresPodcast, GeneresPodcastSchema } = require('./generesPodcast.model');
const { GeneresSong, GeneresSongSchema } = require('./generesSong.model');
const { Author, AuthorSchema } = require('./author.model');
const { Songs, SongsSchema } = require('./songs.model');
const { Podcast, PodcastSchema } = require('./podcast.model');
const { AudioBooks, AudioBooksSchema } = require('./audioBooks.model');

function setupModels(sequelize) {
  Categories.init(CategoriesSchema, Categories.config(sequelize));
  GeneresAudioBooks.init(GeneresAudioBooksSchema, GeneresAudioBooks.config(sequelize));
  GeneresPodcast.init(GeneresPodcastSchema, GeneresPodcast.config(sequelize));
  GeneresSong.init(GeneresSongSchema, GeneresSong.config(sequelize));
  Author.init(AuthorSchema, Author.config(sequelize));
  Songs.init(SongsSchema, Songs.config(sequelize));
  Podcast.init(PodcastSchema, Podcast.config(sequelize));
  AudioBooks.init(AudioBooksSchema, AudioBooks.config(sequelize));

  Categories.associate(sequelize.models);
  GeneresAudioBooks.associate(sequelize.models);
  GeneresPodcast.associate(sequelize.models);
  GeneresSong.associate(sequelize.models);
  Author.associate(sequelize.models);
  Songs.associate(sequelize.models);
  Podcast.associate(sequelize.models);
  AudioBooks.associate(sequelize.models);
}

module.exports = setupModels;
