import { type ILogErrorRepository } from '@/data/adapters'
import { MongoHelper } from '.'

export class LogMongoRepository implements ILogErrorRepository {
  async logError (stack: string): Promise<void> {
    const collection = MongoHelper.getCollection('errors')
    await collection.insertOne({
      data: stack,
      date: new Date()
    })
  }
}
