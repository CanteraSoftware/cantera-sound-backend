const express = require('express')

const ProductService = require('../services/product.services')
const { updateProductSchema, createProductSchema, getProductSchema } = require('../services/product.schema')
const validatorHandler = require('../middlewares/validator.handler')


const router = express.Router()
const service = new ProductService()


router.get('/', async (req, res, next) => {
  try {
    const product = await service.find()
    // Call all products and transform to JSON
    res.json(product)
  } catch (error) {
    next(error)
  }
}
)

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      // Call specific product by ID and transform to JSON
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      // Create new product
      const newProduct = await service.create(body)
      // Set status "created" in JSON
      res.status(201).json(newProduct);
    } catch (error) {
      next(error)
    }
  }
)

router.post('/file',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      // Create new product
      const newProduct = await service.create(body)
      // Set status "created" in JSON
      res.status(201).json(newProduct);
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      // Update product by ID
      const product = await service.update(id, body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // Delete product by ID
      await service.delete(id)
      // Set status "ok" in JSON
      res.status(200).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router