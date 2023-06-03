import mongoose from 'mongoose'

import app from './app/app'
import config from './app/config'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`Database connecct successfully`)

    app.listen(config.port, () => {
      console.log(`application listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('failed to connect database', err)
  }
}

bootstrap()
