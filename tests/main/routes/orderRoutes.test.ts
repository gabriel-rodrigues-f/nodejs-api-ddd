import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { type Express } from 'express'
import { type Collection } from 'mongodb'

import env from '@/main/config/env'
import { setupApp } from '@/main/config/app'
import { MongoDBHelper } from '@/infrastructure/db/mongodb'
import { type AddOrderParams } from '@/core/ports/driving/services'

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

describe('Order Routes', () => {
  beforeAll(async () => {
    app = setupApp()
    await MongoDBHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoDBHelper.disconnect()
  })

  beforeEach(async () => {
    orderCollection = MongoDBHelper.getCollection('orders')
    await orderCollection.deleteMany({})
    accountCollection = MongoDBHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /orders', () => {
    test('Should return 403 on create order without accessToken', async () => {
      await request(app)
        .post('/api/orders')
        .send(mockAddOrderParams())
        .expect(403)
    })

    test('Should return 204 on add product with valid accessToken', async () => {
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
        .set('authorization', `Bearer ${accessToken}`)
        .send(mockAddOrderParams())
        .expect(204)
    })
  })

  describe('PATCH /orders', () => {
    test('Should return 403 on create order without accessToken', async () => {
      await request(app)
        .post('/api/orders')
        .send(mockAddOrderParams())
        .expect(403)
    })

    test('Should return 204 on update order usign valid accessToken', async () => {
      const reponse = await accountCollection.insertOne({
        name: 'Gabriel',
        email: 'gabriel.rodrigues@gmail.com',
        password: 123
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
      const insertedProduct = await orderCollection.insertOne(mockAddOrderParams())
      const stringfiedId = insertedProduct.insertedId.toHexString()

      await request(app)
        .patch(`/api/orders/${stringfiedId}`)
        .set('authorization', `Bearer ${accessToken}`)
        .send({ status: 'any_status' })
        .expect(204)
    })
  })

  describe('GET /products', () => {
    test('Should return 403 on get orders without accessToken', async () => {
      await request(app)
        .get('/api/orders')
        .send(mockAddOrderParams())
        .expect(403)
    })

    test('Should return 200 on load orders without accessToken', async () => {
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
        .get('/api/products?customer="any_customer"')
        .set('authorization', `Bearer ${accessToken}`)
        .expect(204)
    })
  })
})
