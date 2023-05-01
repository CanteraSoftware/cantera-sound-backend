const express = require('express')

const GendersService = require('../services/genders.services')
const { createGendersSchema, getGendersSchema } = require('../schemas/genders.schema')
const validatorHandler = require('../middlewares/validator.handler')
const { pool } = require('./../config/config');


const router = express.Router()
const service = new GendersService()


router.get('/', async (req, res, next) => {
  try {
    const gender = await service.find()
    // Call all gender and transform to JSON
    res.json(gender)
  } catch (error) {
    next(error)
  }
}
)

router.get('/:id',
  validatorHandler(getGendersSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const gender = await service.findOne(id);
      // Call specific gender by ID and transform to JSON
      res.json(gender)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/', 
  // Validate send datas
  validatorHandler(createGendersSchema, 'body'), 
  async (req, res, next) => {
    try {
      // Require body of the user
      const body = req.body;
      // Select a gender name and find if this name be repite
      const results = await pool.query('SELECT namegender FROM genders;');
      // Find any same values
      const validatorConcidences = (rowFilter, nameFilter) => rowFilter.some(row => row.namegender === nameFilter);
      if (validatorConcidences(results.rows, body.namegender)) {
        return res.status(409).json({
          "statusCode": 409,
          "error": "Conflict",
          "message": "Conflict with same name rows"
        });
      }
      // Create new gender
      const newGender = await service.create(body);
      // Set status "created" in JSON
      res.status(201).json(newGender);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/file',
  validatorHandler(createGendersSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      // Create new gender
      const newCategory = await service.create(body)
      // Set status "created" in JSON
      res.status(201).json(newCategory);
    } catch (error) {
      next(error)
    }
  }
)

// router.patch('/:id',
//   validatorHandler(getGendersSchema, 'params'),
//   validatorHandler(updateGendersSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       // Update gender by ID
//       const gender = await service.update(id, body)
//       res.json(gender)
//     } catch (error) {
//       next(error)
//     }
//   }
// )

router.delete('/:id',
  validatorHandler(getGendersSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // Delete gender by ID
      await service.delete(id)
      // Set status "ok" in JSON
      res.status(200).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router