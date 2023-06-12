import { Server } from 'http'
import mongoose from 'mongoose'

import app from './app/app'
import config from './app/config'
import { errorlogger, logger } from './shared/logger'

process.on('uncaughtException', error => {
  errorlogger.error(error)

  process.exit(1)
})

let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connecct successfully`)

    server = app.listen(config.port, () => {
      logger.info(`application listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('failed to connect database', err)
  }

  process.on('unhendledRejection', error => {
    console.log('unhandaled rejection is detected, we are closing server')
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
