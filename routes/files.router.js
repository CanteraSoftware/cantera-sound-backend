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
      // Require body of the user
      const body = req.body;
      // Select name and url of file and find if this name be repite
      const results = await pool.query('SELECT "nameFile", "fileUrl" FROM files;');
      // Find any same values
      const validatorConcidences = (rowFilter, nameFilter, key) => rowFilter.some(row => row[key] === nameFilter);
      if (validatorConcidences(results.rows, body.nameFile, "nameFile") || validatorConcidences(results.rows, body.fileUrl, "fileUrl")) {
        return res.status(409).json({
          "statusCode": 409,
          "error": "Conflict",
          "message": "Conflict with same name rows"
        });
      }

      const files = JSON.parse(JSON.stringify(req.files));
      const { name, size, mimetype } = files.file || files.fileUrl;
      const url = `https://${config.bucketName}.s3.${config.bucketRegion}.amazonaws.com/${name}`;

      const fileFilter = file => {
        const imageFormat = {
          jpeg: "jpeg",
          png: "png"
        }

        const musicFormat = {
          mpeg: "mpeg",
          mp4: "mp4",
          aac: "aac",
          ogg: "ogg"
      }

        const format = file.split("/");

        return format[0] === "image" ? { "image": imageFormat[format[1]] } :
              format[0] === "video" ? { "video": musicFormat[format[1]] } :
              { "unknown": format[0] };
      }

      if (url.length > 95) {
        return res.status(404).json({
          "statusCode": 406,
          "error": "Not Acceptable",
          "message": "Url longer than expected"
        });
      }

      if ((size / 1024).toFixed(2) > 9000) {
        return res.status(404).json({
          "statusCode": 406,
          "error": "Not Acceptable",
          "message": "File is very big. Send a image more smoll or compress the file"
        });
      }

      if (fileFilter(mimetype).image !== undefined && fileFilter(mimetype).image) {
        return res.status(404).json({
          "statusCode": 406,
          "error": "Not Acceptable",
          "message": "This file must be of type jpeg or png"
        });
      } else if (fileFilter(mimetype).video !== undefined && fileFilter(mimetype).video) {
        return res.status(404).json({
          "statusCode": 406,
          "error": "Not Acceptable",
          "message": "This file must be of type mp3, mp4, acc or ogg"
        });
      } else if (fileFilter(mimetype).unknown) {
        return res.status(404).json({
          "statusCode": 406,
          "error": "Not Acceptable",
          "message": `${fileFilter(mimetype).unknown} is unknown file type. Send a file of a different type`
        });
      }

      const downloadFile = async (fileName) => {
        try {
          const file = await service.getFile(fileName);
          if (!file) {
            return res.status(404).json({
              "statusCode": 404,
              "error": "Not Found",
              "message": "File not found"
            });
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