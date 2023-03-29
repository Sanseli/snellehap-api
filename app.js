const express = require('express')
const cors = require('cors')

const app = express()

const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const menusRouter = require('./controllers/menus')

// require('express-async-errors')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/menus', menusRouter
)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app