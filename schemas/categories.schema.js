const Joi = require('joi')

const id = Joi.number().integer();
const nameCategory = Joi.number().integer();

const createCategorySchema = Joi.object({
  nameCategory: nameCategory.required()
})

const getCategorySchema = Joi.object({
  id: id.required()
})

module.exports = { createCategorySchema, getCategorySchema }