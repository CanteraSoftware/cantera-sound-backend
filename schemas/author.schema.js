const Joi = require('joi');

const id = Joi.number().integer();
const nameAuthor = Joi.number().integer();
const categoryId = Joi.number().integer();

const createGenereSchema = Joi.object({
  nameAuthor: nameAuthor.required(),
  categoryId: categoryId.required()
})

const getAuthorSchema = Joi.object({
  id: id.required()
})


module.exports = { createGenereSchema, getAuthorSchema }
