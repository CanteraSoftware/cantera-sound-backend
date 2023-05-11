const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

// S3 ###########################
const { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
// modulo para poder trabajar con archivos de node
const fs = require('fs')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { config } = require('../config/config');

// connection aws
const client = new S3Client({
  region: config.bucketRegion,
  credentials: {
    accessKeyId: config.publicKey,
    secretAccessKey: config.secretKey,
  }
})

// DB ###########################

class FilesServices {

  // crear funcion que permita subir archivos
  async uploadFile(file) {
    // crea un objeto string, el string permite dividir el archivo y subirlo a donde quieras, en este caso aws
    const stream = fs.createReadStream(file.tempFilePath)
    // parametros
    const uploadParams = {
      Bucket: config.bucketName,
      Key: file.name,
      Body: stream
    }
    // describe las operaciones
    const command = new PutObjectCommand(uploadParams)
    const result = await client.send(command)
    console.log(result);
  }

  // crear funcion que permita obtener archivos
  async getFiles() {
    const command = new ListObjectsCommand({
      Bucket: config.bucketName
    })
    const result = await client.send(command)
    return result;
  }

  // crear funcion que permita obtener un archivo
  async getFile(filename) {
    const command = new GetObjectCommand({
      Bucket: config.bucketName,
      Key: filename
    })
    // lo envia al cliente
    const result = await client.send(command)
    return result;
  }

  // descargar el archivo
  async downloadFile(filename) {
    const command = new GetObjectCommand({
      Bucket: config.bucketName,
      Key: filename
    })
    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
    return signedUrl;
  }

  // DB ###########################

  // Create new file
  async create(data) {
    const newFiles = await models.Files.create({
      ...data,
    })
    return newFiles;
  }

  // Find all files
  async find() {
    const files = await models.Files.findAll();

    return files;
  }

  // Find file by ID
  async findOne(id) {
    const file = await models.Files.findByPk(id)
    return file;
  }


  // Delete file by ID
  // ATTENTION
  async delete(id) {
    const file = await this.findOne(id);
    await file.destroy();
    return { id };
  }
}

module.exports = FilesServices;