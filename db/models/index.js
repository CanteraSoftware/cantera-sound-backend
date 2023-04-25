const { Author, AuthorSchema } = require('./author.model');
const { Categories, CategoriesSchema } = require('./categories.model');
const { GeneresAudioBooks, GeneresAudioBooksSchema } = require('./categoriess.model');
const { GeneresPodcast, GeneresPodcastSchema } = require('./generesPodcast.model');
const { GeneresSong, GeneresSongSchema } = require('./generesSong.model');
const { Podcast, PodcastSchema } = require('./podcast.model');
const { AudioBooks, AudioBooksSchema } = require('./audioBooks.model');
const { Songs, SongsSchema } = require('./songs.model');

function setupModels(sequelize) {
  Author.init(AuthorSchema, Author.config(sequelize));
  Categories.init(CategoriesSchema, Categories.config(sequelize));
  GeneresAudioBooks.init(GeneresAudioBooksSchema, GeneresAudioBooks.config(sequelize));
  GeneresPodcast.init(GeneresPodcastSchema, GeneresPodcast.config(sequelize));
  GeneresSong.init(GeneresSongSchema, GeneresSong.config(sequelize));
  Podcast.init(PodcastSchema, Podcast.config(sequelize));
  AudioBooks.init(AudioBooksSchema, AudioBooks.config(sequelize));
  Songs.init(SongsSchema, Songs.config(sequelize));

  Author.associate(sequelize.models);
  Categories.associate(sequelize.models);
  GeneresAudioBooks.associate(sequelize.models);
  GeneresPodcast.associate(sequelize.models);
  GeneresSong.associate(sequelize.models);
  Podcast.associate(sequelize.models);
  AudioBooks.associate(sequelize.models);
  Songs.associate(sequelize.models);
}

module.exports = setupModels;
