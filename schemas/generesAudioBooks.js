const Joi = require('joi')

const id = Joi.number().integer();
const nameGenere_audiobooks = Joi.number().integer();

const createGenereSchema = Joi.object({
  nameGenere_audiobooks: nameGenere_audiobooks.required()
})

const getGenereSchema = Joi.object({
  id: id.required()
})

module.exports = { createGenereSchema, getGenereSchema }