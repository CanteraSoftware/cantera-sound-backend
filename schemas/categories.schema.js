const Joi = require('joi');

const id = Joi.number().integer();
const nameCategory = Joi.number().integer()

const createCategoriesSchema = Joi.object({
  nameCategory: nameCategory.required()
})

const getCategoriesSchema = Joi.object({
  id: id.required()
})


module.exports = { createCategoriesSchema, getCategoriesSchema }
