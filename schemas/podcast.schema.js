const Joi = require('joi');

const id = Joi.number().integer();
const namePodcast = Joi.number().integer();
const authorId = Joi.number().integer();
const generoId = Joi.number().integer();

const createPodcastSchema = Joi.object({
  namePodcast: namePodcast.required(),
  authorId: authorId.required(),
  generoId: generoId.required()
})

const getPodcastSchema = Joi.object({
  id: id.required()
})

module.exports = { createPodcastSchema, getPodcastSchema }
