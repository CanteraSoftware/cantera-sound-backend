const Joi = require('joi')

// Validations
const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const author = Joi.number().integer();
const genders = Joi.string().min(3).max(50);
const image = Joi.string().uri();
const url_song = Joi.string().uri();

const createCategorySchema = Joi.object({
  name: name.required(),
  author: author.required(),
  genders: genders.required(),
  image: image.required(),
  url_song: url_song.required()
})

const updateCategorySchema = Joi.object({
  name: name,
  image: image,
})

const getCategorySchema = Joi.object({
  id: id.required()
})

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }