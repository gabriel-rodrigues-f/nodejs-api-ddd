import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb'
import env from './config/env'

MongoHelper.connect(env.MONGO_DB_URL)
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = setupApp()
    app.listen(env.PORT, () => process.stdout.write(`Server running at ${env.PORT}`))
  }).catch(console.error)
