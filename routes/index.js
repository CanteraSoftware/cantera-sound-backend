const express = require('express')

const categoriesRouter = require('./categories.router')
const filesRouter = require('./files.router')
const gendersRouter = require('./genders.router')
const html = require('../public/index.html')

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/categories', categoriesRouter)
  router.use('/files', filesRouter)
  router.use('/genders', gendersRouter)
  router.use('/home', html)
}
module.exports = routerApi;