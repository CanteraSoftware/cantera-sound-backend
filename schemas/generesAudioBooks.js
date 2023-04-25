const Joi = require('joi')

const id = Joi.number().integer();
const nameGenere = Joi.number().integer();

const createGenereSchema = Joi.object({
  nameGenere: nameGenere.required()
})

const getGenereSchema = Joi.object({
  id: id.required()
})

module.exports = { createGenereSchema, getGenereSchema }