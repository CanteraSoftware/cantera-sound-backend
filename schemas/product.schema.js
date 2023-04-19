const Joi = require('joi')

// Validations
const id = Joi.number().integer();
const name = Joi.string().min(3).max(45);
const price = Joi.number().min(1);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required()
})

const updateProductSchema = Joi.object({
  name: name,
  price: price
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }