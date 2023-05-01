const express = require('express')

const FilesService = require('../services/files.services')
const { createFilesSchema, getFilesSchema } = require('../schemas/files.schema')
const validatorHandler = require('../middlewares/validator.handler')
const { pool } = require('./../config/config');


const router = express.Router()
const service = new FilesService()


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

router.post('/',
  // Validate send datas
  validatorHandler(createFilesSchema, 'body'),
  async (req, res, next) => {
    try {
      // Require body of the user
      const body = req.body;
      // Select name and url of file and find if this name be repite
      const results = await pool.query('SELECT name_file, file_url FROM files;');
      // Find any same values
      const validatorConcidences = (rowFilter, nameFilter, key) => rowFilter.some(row => row[key] === nameFilter);
      if (validatorConcidences(results.rows, body.name_file, "name_file") || validatorConcidences(results.rows, body.file_url, "file_url")) {
        return res.status(409).json({
          "statusCode": 409,
          "error": "Conflict",
          "message": "Conflict with same name rows"
        });
      }
      // Create new files
      const newfiles = await service.create(body);
      // Set status "created" in JSON
      res.status(201).json(newfiles);
    } catch (error) {
      next(error);
    }
  }
);



router.post('/file',
  validatorHandler(createFilesSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      // Create new file
      const newCategory = await service.create(body)
      // Set status "created" in JSON
      res.status(201).json(newCategory);
    } catch (error) {
      next(error)
    }
  }
)

// router.patch('/:id',
//   validatorHandler(getFilesSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       // Update file by ID
//       const file = await service.update(id, body)
//       res.json(file)
//     } catch (error) {
//       next(error)
//     }
//   }
// )

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