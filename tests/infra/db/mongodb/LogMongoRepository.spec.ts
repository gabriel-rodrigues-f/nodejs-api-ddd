import {
  MongoDBHelper,
  LogMongoRepository
} from '@/infra/db'
import { type ILogErrorRepository } from '@/core/ports/driven'

describe('Log Mongo Repository', () => {
  let errorCollection
  const MONGO_URL = process.env.MONGO_URL || ''

  beforeAll(async () => {
    await MongoDBHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoDBHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = MongoDBHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  const mockSut = (): ILogErrorRepository => {
    return new LogMongoRepository()
  }

  test('Should create an error log on success ', async () => {
    const sut = mockSut()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
