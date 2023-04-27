const express = require('express')

const GendersService = require('../services/genders.services')
const { createGendersSchema, getGendersSchema } = require('../schemas/genders.schema')
const validatorHandler = require('../middlewares/validator.handler')


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