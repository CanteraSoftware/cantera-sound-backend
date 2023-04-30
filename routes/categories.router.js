const express = require('express')

const CategoriesService = require('../services/categories.services')
const { createCategoriesSchema, getCategoriesSchema } = require('../schemas/categories.schema')
const validatorHandler = require('../middlewares/validator.handler')
const { pool } = require('./../config/config');


const router = express.Router()
const service = new CategoriesService()


router.get('/', async (req, res, next) => {
  try {
    const category = await service.find()
    // Call all category and transform to JSON
    res.json(category)
  } catch (error) {
    next(error)
  }
}
)

router.get('/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      // Call specific category by ID and transform to JSON
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createCategoriesSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      pool.query('SELECT id FROM categories;', (error, results) => {
        if (error) {
          throw error;
        }
        // Find any same values
        validatorConcidences = (rowFilter, nameFilter) => rowFilter.some(row => row.nameCategory === nameFilter);
        if (validatorConcidences(results.rows, body.nameCategory)) {
          throw res.status(409).json({
            "statusCode": 409,
            "error": "Conflict",
            "message": "Conflict with same name rows"
          });
        }
        pool.end();
      });
      // Create new category
      const newCategory = await service.create(body)
      // Set status "created" in JSON
      res.status(201).json(newCategory);
    } catch (error) {
      next(error)
    }
  }
)

router.post('/file',
  validatorHandler(createCategoriesSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      // Create new category
      const newCategory = await service.create(body)
      // Set status "created" in JSON
      res.status(201).json(newCategory);
    } catch (error) {
      next(error)
    }
  }
)

// router.patch('/:id',
//   validatorHandler(getCategoriesSchema, 'params'),
//   validatorHandler(updateCategoriesSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       // Update category by ID
//       const category = await service.update(id, body)
//       res.json(category)
//     } catch (error) {
//       next(error)
//     }
//   }
// )

router.delete('/:id',
  validatorHandler(getCategoriesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // Delete category by ID
      await service.delete(id)
      // Set status "ok" in JSON
      res.status(200).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router