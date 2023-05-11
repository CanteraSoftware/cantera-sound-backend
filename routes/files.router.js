const express = require('express')

const aws = require("aws-sdk");
const multer = require("multer");
const { config, pool } = require('../config/config');
const multerS3 = require("multer-s3");

const FilesService = require('../services/files.services')
const { createFilesSchema, getFilesSchema } = require('../schemas/files.schema')
const validatorHandler = require('../middlewares/validator.handler')

const s3 = new aws.S3({
  accessKeyId: config.publicKey,
  secretAccessKey: config.secretKey,
  Bucket: config.bucketName,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucketName,
    metadata: (req, file, cb) => {
      console.log(file);
      cb(null, { fieldName: file.originalname });
    },
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
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
    // console.log(res.send(req.files.file));
    // console.log(res.send({ data: req.file, msg: "Exito" }));

    try {
      const fileUpload = await service.uploadFile(req.files.file)
      // console.log(fileUpload, 'Informacion');

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

      const fileKey = JSON.parse(JSON.stringify(req.files)).file.name
      const signedUrl = await downloadFile(fileKey);
      // Create new file
      const file = await service.create({
        ...body,
        fileUrl: signedUrl.slice(0, 90)
      })
      // Set status "created" in JSON
      res.status(201).json(file);
      // res.json({ message: 'upload files' })
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