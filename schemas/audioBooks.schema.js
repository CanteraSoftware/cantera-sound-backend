const Joi = require('joi');

const id = Joi.number().integer();
const nameAudioBooks = Joi.number().integer();
const authorId = Joi.number().integer();
const generoId = Joi.number().integer();

const createAudioBooksSchema = Joi.object({
  nameAudioBooks: nameAudioBooks.required(),
  authorId: authorId.required(),
  generoId: generoId.required()
})

const getAudioBooksSchema = Joi.object({
  id: id.required()
})


module.exports = { createAudioBooksSchema, getAudioBooksSchema }
