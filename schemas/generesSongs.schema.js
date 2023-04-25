const Joi = require('joi')

const id = Joi.number().integer();
const nameGenere_songs = Joi.number().integer();

const createGenereSchema = Joi.object({
  nameGenere_songs: nameGenere_songs.required()
})

const getGenereSchema = Joi.object({
  id: id.required()
})

module.exports = { createGenereSchema, getGenereSchema }