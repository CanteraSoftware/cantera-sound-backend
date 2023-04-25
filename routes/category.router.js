const express = require('express')

const CategoryService = require('../services/category.services')
const { updateCategorySchema, createCategorySchema, getCategorySchema } = require('../schemas/categories.schema')
const validatorHandler = require('../middlewares/validator.handler')


const router = express.Router()
const service = new CategoryService()


router.get('/', async (req, res, next) => {
  console.log('Meow')
  try {
    const category = await service.find()
    // Call all categories and transform to JSON
    res.json(category)
  } catch (error) {
    next(error)
  }
}
)

router.get('/filter', (req, res) => {
  const categoria = req.query.categoria; // recupera el valor del parámetro de consulta "categoria"
  const cancionesFiltradas = canciones.filter(cancion => cancion.categoria === categoria); // filtra las canciones que pertenecen a la categoría especificada

  res.send(cancionesFiltradas); // envía la lista de canciones filtradas como respuesta al cliente
  res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
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
  validatorHandler(createCategorySchema, 'body'),
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

router.post('/file',
  validatorHandler(createCategorySchema, 'body'),
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

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      // Update category by ID
      const category = await service.update(id, body)
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
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