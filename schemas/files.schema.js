const Joi = require('joi')

// Validations
const id = Joi.number().integer();
const nameFile = Joi.string().min(3).max(45);
const nameAuthor = Joi.string().min(3).max(45);
const imageUrl = Joi.string().uri()
const fileUrl = Joi.string().uri()
const categoryId = Joi.number().integer();
const genderId = Joi.number().integer();


const createFilesSchema = Joi.object({
  namefile: nameFile.required(),
  nameauthor: nameAuthor.required(),
  imageurl: imageUrl,
  fileurl: fileUrl.required(),
  categoryid: categoryId.required(),
  genderid: genderId.required(),
})

const getFilesSchema = Joi.object({
  id: id.required()
})

module.exports = { createFilesSchema, getFilesSchema }
