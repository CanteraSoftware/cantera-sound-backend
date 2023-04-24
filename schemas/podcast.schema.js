const Joi = require('joi')

const id = Joi.number().integer();
const namPodcast = Joi.number().integer();
const authorId = Joi.number().integer();

const creatPodcastSchema = Joi.object({
  namePodcast: namPodcast.required(),
  authorId: authorId.required(),
})

const getAudioBooksSchema = Joi.object({
  id: id.required()
})

module.exports = { creatPodcastSchema, getAudioBooksSchema }