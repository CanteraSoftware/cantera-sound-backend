const express = require('express')

const aws = require("aws-sdk");
const { config, pool } = require('../config/config');

const FilesService = require('../services/files.services')
const { createFilesSchema, getFilesSchema } = require('../schemas/files.schema')
const validatorHandler = require('../middlewares/validator.handler')

const s3 = new aws.S3({
  accessKeyId: config.publicKey,
  secretAccessKey: config.secretKey,
  Bucket: config.bucketName,
});

const router = express.Router()

const service = new FilesService()


router.get('/upload', async (req, res) => {
  const result = await service.getFiles()
  // result.Contents.forEach(e => {
  //   console.log(e.Key)
  // });
  res.json(result.Contents)
});

router.get('/', async (req, res, next) => {
  try {
    const file = await service.find()
    // Call all file and transform to JSON
    res.json(file)
  } catch (error) {
    next(error)
  }
}
)

router.get('/:id',
  validatorHandler(getFilesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const file = await service.findOne(id);
      // Call specific file by ID and transform to JSON
      res.json(file)
    } catch (error) {
      next(error)
    }
  }
)


router.post('/upload',
  // Validate send datas
  validatorHandler(createFilesSchema, 'body'),
  async (req, res, next) => {

    try {
      const imageFormat = [
        "jpeg",
        "png"
      ]

      const musicFormat = [
        "mpeg",
        "mp4",
        "aac",
        "ogg"
      ]

      const commaSeparator = format => `${Object.keys(format).slice(0, format.length-2).join(', ')} or ${format.length-1}`

      const errorStatus = {
          conflict: "Conflict",
          notAcceptable: "Not Acceptable",
          notFound: "Not Found"
      }

      const errorMessage = {
        conflictRows: "Conflict with same name rows",
        urlTooLong: "Url longer than expected",
        fileTooBig: "File is very big. Send a smaller image or compress the file",
        invalidImageType: `This file must be of type ${commaSeparator(imageFormat)}`,
        invalidVideoType: `This file must be of type ${commaSeparator(musicFormat)}`,
        unknownFileType: "Unknown file type. Send a file of a different type",
        notFound: "File not found"
      }

      const returnError = (statusCode, error, message) => {
        return res.status(statusCode).json({
          statusCode,
          error,
          message
        });
      }

      // Require body of the user
      const body = req.body;
      // Select name and url of file and find if this name be repite
      const results = await pool.query('SELECT "nameFile", "fileUrl" FROM files;');
      // Find any same values
      const validatorConcidences = (rowFilter, nameFilter, key) => rowFilter.some(row => row[key] === nameFilter);
      if (validatorConcidences(results.rows, body.nameFile, "nameFile") || validatorConcidences(results.rows, body.fileUrl, "fileUrl")) {
        return returnError(409, errorStatus.conflict, errorMessage.conflictRows);
      }

      const files = JSON.parse(JSON.stringify(req.files));
      const { name, size, mimetype } = files.file || files.fileUrl;
      const url = `https://${config.bucketName}.s3.${config.bucketRegion}.amazonaws.com/${name}`;

      const sizeLimit = 9000;

      const fileFilter = file => {
        const format = file.split("/");

        return format[0] === "image" ? { image: imageFormat.includes(format[1]) } :
          format[0] === "video" ? { video: musicFormat.includes(format[1]) } :
            { unknown: true };
      }

      if (url.length > 95) {
        return returnError(406, errorStatus.notAcceptable, errorMessage.urlTooLong);
      }

      if ((size / 1024).toFixed(2) > sizeLimit) {
        return returnError(406, errorStatus.notAcceptable, errorMessage.fileTooBig);
      }

      const filterResult = fileFilter(mimetype);
      if (filterResult.image !== undefined && filterResult.image) {
        return returnError(406, errorStatus.notAcceptable, errorMessage.invalidImageType);
      } else if (filterResult.video !== undefined && filterResult.video) {
        return returnError(406, errorStatus.notAcceptable, errorMessage.video);
      } else if (filterResult.unknown) {
        return returnError(406, errorStatus.notAcceptable, errorMessage.unknownFileType);
      }

      const downloadFile = async (fileName) => {
        try {
          const file = await service.getFile(fileName);
          if (!file) {
            return returnError(404, errorStatus.notFound, errorMessage.notFound);
          }
          const fileUrl = await service.downloadFile(fileName);
          return fileUrl
        } catch (error) {
          next(error);
        }
      };

      const fileUpload = await service.uploadFile(tempFilePath, name)
      // fileUpload.$metadata.requestId have a innuque Id, possible finale of url

      const signedUrl = await downloadFile(name);

      // Create new file
      const file = await service.create({
        ...body,
        fileUrl: url
      })
      // Set status "created" in JSON
      res.status(201).json(file);
    } catch (error) {
      next(error)
    }
  });


router.delete('/:id',
  validatorHandler(getFilesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // Delete file by ID
      await service.delete(id)
      // Set status "ok" in JSON
      res.status(200).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router