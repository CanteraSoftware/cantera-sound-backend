const express = require('express')

const productRouter = require('./product.router')

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/product', productRouter)
}
module.exports = routerApi;