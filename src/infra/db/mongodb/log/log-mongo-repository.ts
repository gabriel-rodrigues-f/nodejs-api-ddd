import { LogErrorRepository } from '../../../../data/protocols/db/log/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorsRollection = MongoHelper.getCollection('errors')
    await errorsRollection.insertOne({
      data: stack,
      date: new Date()
    })
  }
}
