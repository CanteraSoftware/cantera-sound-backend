const Joi = require('joi')

const id = Joi.number().integer();
const nameAuthor = Joi.number().integer();
const categoryId = Joi.number().integer();

const createAuthorSchema = Joi.object({
  nameAuthor: nameAuthor.required(),
  categoryId: categoryId.required()
})

const getAuthorSchema = Joi.object({
  id: id.required()
})

module.exports = { createAuthorSchema, getAuthorSchema }