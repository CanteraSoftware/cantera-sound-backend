const express = require('express')

const songsRouter = require('./songs.router')

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/songs', songsRouter)
}
module.exports = routerApi;