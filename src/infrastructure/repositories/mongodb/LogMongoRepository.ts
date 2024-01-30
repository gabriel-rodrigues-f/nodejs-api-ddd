import { type ILogErrorRepository } from '@/core/ports/driven'
import { MongoDBHelper } from '.'

export class LogMongoRepository implements ILogErrorRepository {
  async logError (stack: string): Promise<void> {
    const collection = MongoDBHelper.getCollection('errors')
    await collection.insertOne({
      data: stack,
      date: new Date()
    })
  }
}
