import { ObjectId, type Collection } from 'mongodb'
import request from 'supertest'
import { type Express } from 'express'
import { setupApp } from '@/main/config/app'
import { MongoDBHelper } from '@/infrastructure/db/mongodb'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'

let app: Express

let accountCollection: Collection
const MONGO_URL = process.env.MONGO_URL || ''

const mockAddAccountParams = (): any => ({
  cpf: '12345678909',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  accessToken: 'any_token'
})

describe('Login Routes', () => {
  beforeAll(async () => {
    app = setupApp()
    await MongoDBHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoDBHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoDBHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /logout', () => {
    test('Should return 403 on logout', async () => {
      await request(app)
        .post('/api/logout')
        .send({ email: 'any_email' })
        .expect(403)
    })
  })

  describe('POST /logout', () => {
    test('Should return 204 on logout', async () => {
      const response = await accountCollection.insertOne(mockAddAccountParams())
      const id = response.insertedId
      const accessToken = sign({ id }, env.JWT_SECRET)
      await accountCollection.updateOne({
        _id: new ObjectId(id)
      }, {
        $set: { accessToken }
      })
      await request(app)
        .post('/api/logout')
        .set('authorization', `Bearer ${accessToken}`)
        .send({ email: 'any_mail' })
        .expect(204)
    })
  })
})
