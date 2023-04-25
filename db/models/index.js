const { Author, AuthorSchema } = require('./author.model');
const { Categories, CategoriesSchema } = require('./categories.model');
const { GenderAudioBooks, GenderAudioBooksSchema } = require('./gendersAudioBooks.model');
const { GenderPodcast, GenderPodcastSchema } = require('./gendersPodcast.model');
const { GenderSong, GenderSongSchema } = require('./gendersSong.model');
const { Podcast, PodcastSchema } = require('./podcast.model');
const { AudioBooks, AudioBooksSchema } = require('./audioBooks.model');
const { Songs, SongsSchema } = require('./songs.model');

function setupModels(sequelize) {
  Author.init(AuthorSchema, Author.config(sequelize));
  Categories.init(CategoriesSchema, Categories.config(sequelize));
  GenderAudioBooks.init(GenderAudioBooksSchema, GenderAudioBooks.config(sequelize));
  GenderPodcast.init(GenderPodcastSchema, GenderPodcast.config(sequelize));
  GenderSong.init(GenderSongSchema, GenderSong.config(sequelize));
  Podcast.init(PodcastSchema, Podcast.config(sequelize));
  AudioBooks.init(AudioBooksSchema, AudioBooks.config(sequelize));
  Songs.init(SongsSchema, Songs.config(sequelize));

  Author.associate(sequelize.models);
  Categories.associate(sequelize.models);
  GenderAudioBooks.associate(sequelize.models);
  GenderPodcast.associate(sequelize.models);
  GenderSong.associate(sequelize.models);
  Podcast.associate(sequelize.models);
  AudioBooks.associate(sequelize.models);
  Songs.associate(sequelize.models);
}

module.exports = setupModels;
