<<<<<<< HEAD
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
=======
const Joi = require('joi');

const id = Joi.number().integer();
const nameCategory = Joi.number().integer()

const createCategorySchema = Joi.object({
  nameCategory: nameCategory.required()
>>>>>>> f568ff60ced14defbe4609c1e001f33b31720597
})

const getCategorySchema = Joi.object({
  id: id.required()
})

<<<<<<< HEAD
module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
=======

module.exports = { createCategorySchema, getCategorySchema }
>>>>>>> f568ff60ced14defbe4609c1e001f33b31720597
