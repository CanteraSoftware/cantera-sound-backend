const Joi = require('joi')

// Validations
const id = Joi.number().integer();
const nameSong = Joi.string().min(3).max(45);
const authorId = Joi.number().integer();
const generoId = Joi.number().integer();
const song = Joi.string().uri();
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  nameSong: nameSong.required(),
  authorId: authorId.required(),
  generoId: generoId.required(),
  song: song.required(),
  image: image.required(),
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = { createProductSchema, getProductSchema }