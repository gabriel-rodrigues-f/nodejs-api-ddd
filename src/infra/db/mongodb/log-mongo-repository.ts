import { type LogErrorRepository } from '@/data/protocols'
import { MongoHelper } from '.'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorsRollection = MongoHelper.getCollection('errors')
    await errorsRollection.insertOne({
      data: stack,
      date: new Date()
    })
  }
}
