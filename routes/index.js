const express = require('express')

const categoryRouter = require('./category.router')

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/category', categoryRouter)
  // router.use('/music', categoryRouter)
  // router.use('/music/:gender', categoryRouter)
  // router.use('/music/:gender/:teme', categoryRouter)
  // router.use('/music/:gender/trend', categoryRouter)
  // router.use('/music/trend', categoryRouter)
  // router.use('/user', categoryRouter)
  // router.use('/user/preferences', categoryRouter)
  // router.use('/user/list', categoryRouter)
}
module.exports = routerApi;