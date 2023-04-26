const Joi = require('joi')

// Validations
const id = Joi.number().integer();
const nameFile = Joi.string().min(3).max(45);
const categoryId = Joi.number().integer(1);
const fileUrl = Joi.string().uri()
const nameAuthor = Joi.string().min(3).max(45);
const genderId = Joi.number().integer(1);
const imageUrl = Joi.string().uri()


const createFilesSchema = Joi.object({
  nameFile: nameFile.required(),
  categoryId: categoryId.required(),
  fileUrl: fileUrl.required(),
  nameAuthor: nameAuthor.required(),
  genderId: genderId.required(),
  imageUrl: imageUrl,
})

const getFilesSchema = Joi.object({
  id: id.required()
})

module.exports = { createFilesSchema, getFilesSchema }
