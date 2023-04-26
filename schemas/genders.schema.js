const Joi = require('joi');

const id = Joi.number().integer();
const nameGender = Joi.number().integer();

const createGendersSchema = Joi.object({
  nameGender: nameGender.required()
})

const getGendersSchema = Joi.object({
  id: id.required()
})


module.exports = { createGendersSchema, getGendersSchema }
