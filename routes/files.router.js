const express = require('express')

const aws = require("aws-sdk");
const multer = require("multer");
const { config } = require('../config/config');
const multerS3 = require("multer-s3");

const FilesService = require('../services/files.services')
const { createFilesSchema, getFilesSchema } = require('../schemas/files.schema')
const validatorHandler = require('../middlewares/validator.handler');
const { date } = require('joi');
const { get } = require('http');

// const s3 = new aws.S3({
//   accessKeyId: config.publicKey,
//   secretAccessKey: config.secretKey,
//   Bucket: config.bucketName,
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: config.bucketName,
//     metadata: (req, file, cb) => {
//       console.log(file);
//       cb(null, { fieldName: file.originalname });
//     },
//     key: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   }),
// });

const router = express.Router()

const service = new FilesService()

router.get('/upload/:fileName', async (req, res) => {
  const result = await service.getFileURL(req.params.fileName);
  // res.send({
  //   url: result
  // })
  console.log(result)
})

router.post('/upload', validatorHandler(createFilesSchema, 'body'), async (req, res) => {
  // await service.uploadFile(req.files.file) no borrar
  res.send(req.files.file);

  const fileName = req.files.file.name

  const url = `/upload/${fileName}`
  req.app.handle('GET', url, null, req, res)
    .then(() => {
      console.log('hola')
      // res.status(201).json({
      //   message: 'Producto creado exitosamente',
      // });
    })
    .catch((error) => {
      // Manejar cualquier error que pueda ocurrir al llamar al controlador GET
      console.error(error);
      res.status(500).json({
        message: 'Ha ocurrido un error al recuperar el producto creado'
      });
    });


    /* .then(response => {
      // console.log(response)
      // response.forEach(element => {
        
      // });
      // router.get('/upload', async (req, res) => {

      //   const result = await service.getFile()
      //   res.json(result.Contents)
      // });
    }) */
    /*  .then(async () => {
       const body = req.body;
       const file = await service.create(body)
       res.status(201).json(file);
     }) */

    // res.json({ message: 'upload files' })

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

/* router.get('/:id',###
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
) */

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

// ##

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