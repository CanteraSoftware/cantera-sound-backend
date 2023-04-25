const express = require('express')

const SongsService = require('../services/songs.services')
const { updateSongsSchema, createSongsSchema, getSongsSchema } = require('../schemas/songs.schema')
const validatorHandler = require('../middlewares/validator.handler')


const router = express.Router()
const service = new SongsService()


router.get('/', async (req, res, next) => {
  try {
    const song = await service.find()
    // Call all songs and transform to JSON
    res.json(song)
  } catch (error) {
    next(error)
  }
}
)

router.get('/:id',
  validatorHandler(getSongsSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const song = await service.findOne(id);
      // Call specific songs by ID and transform to JSON
      res.json(song)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createSongsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      // Create new songs
      const newSongs = await service.create(body)
      // Set status "created" in JSON
      res.status(201).json(newSongs);
    } catch (error) {
      next(error)
    }
  }
)

router.post('/file',
  validatorHandler(createSongsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      // Create new songs
      const newSongs = await service.create(body)
      // Set status "created" in JSON
      res.status(201).json(newSongs);
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  validatorHandler(getSongsSchema, 'params'),
  validatorHandler(updateSongsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      // Update songs by ID
      const song = await service.update(id, body)
      res.json(song)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getSongsSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      // Delete songs by ID
      await service.delete(id)
      // Set status "ok" in JSON
      res.status(200).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router