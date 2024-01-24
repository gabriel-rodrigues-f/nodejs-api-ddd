import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { type Express } from 'express'
import { type Collection } from 'mongodb'

import env from '@/main/config/env'
import { setupApp } from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb'
import { type AddOrderParams } from '@/domain/usecases'

let orderCollection: Collection
let accountCollection: Collection
const MONGO_URL = process.env.MONGO_URL || ''

let app: Express

const mockAddOrderParams = (): AddOrderParams => ({
  customer: 'any_customer',
  products: [
    {
      id: '65aa013deca75aaae89c3a1b',
      totalItems: 2,
      unitPrice: 2000,
      amount: 4000
    }
  ],
  status: 'any_status',
  createdAt: new Date(),
  updatedAt: new Date(),
  amount: 4000
})

describe('Product Routes', () => {
  beforeAll(async () => {
    app = setupApp()
    await MongoHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    orderCollection = MongoHelper.getCollection('orders')
    await orderCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /orders', () => {
    test('Should return 403 on create order without admin role', async () => {
      await request(app)
        .post('/api/orders')
        .send(mockAddOrderParams())
        .expect(403)
    })

    test('Should return 204 on add product usign valid accessToken', async () => {
      const reponse = await accountCollection.insertOne({
        name: 'Gabriel',
        email: 'gabriel.rodrigues@gmail.com',
        password: 123,
        role: 'admin'
      })
      const id = reponse.insertedId
      const accessToken = sign({ id }, env.JWT_SECRET)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/orders')
        .set('x-access-token', accessToken)
        .send(mockAddOrderParams())
        .expect(204)
    })
  })
})
