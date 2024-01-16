import { LogMongoRepository } from './log-mongo-repository'
import {
  type LogErrorRepository,
  MongoHelper
} from './index'

describe('Log Mongo Repository', () => {
  let errorCollection
  const MONGO_URL = process.env.MONGO_URL || ''

  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  const makeSut = (): LogErrorRepository => {
    return new LogMongoRepository()
  }

  test('Should create an error log on success ', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
