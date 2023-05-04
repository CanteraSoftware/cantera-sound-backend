const express = require('express')

const aws = require("aws-sdk");
const multer = require("multer");
const { config } = require('../config/config');
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

// router.post('/',
//   validatorHandler(createFilesSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const body = req.body;
//       // Create new file
//       const file = await service.create(body)
//       // Set status "created" in JSON
//       res.status(201).json(file);
//     } catch (error) {
//       next(error)
//     }
//   }
// )

/* router.post("/", upload.single("file"),
  validatorHandler(createFilesSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = (
        req.body.nameFile,
        req.body.nameAuthor,
        req.body.imageUrl,
        // req.body.fileUrl
        req.body.categoryId,
        req.body.genderId,
        req.files
      );
      // Create new file
      const newFile = await service.create(body)
      // res.send({ data: req.files, msg: "Exito" });
      res.status(201).json(newFile);
    } catch (error) {
      next(error)
    }
  }
) */

// router.post("/upload", upload.single("file"), (req, res, next) => {
//   res.send({ data: req.files, msg: "Exito" });
// });

router.post('/upload', validatorHandler(createFilesSchema, 'body'), async (req, res) => {
  // console.log(res.send(req.files.file));

  try {
    const body = req.body;
    await service.uploadFile(req.files.file)
    // Create new file
    const file = await service.create(body)
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