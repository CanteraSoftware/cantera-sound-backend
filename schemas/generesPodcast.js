const Joi = require('joi')

const id = Joi.number().integer();
const nameGenere_podcast = Joi.number().integer();

const createGenereSchema = Joi.object({
  nameGenere_podcast: nameGenere_podcast.required()
})

const getGenereSchema = Joi.object({
  id: id.required()
})

module.exports = { createGenereSchema, getGenereSchema }