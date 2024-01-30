import { type Collection } from 'mongodb'
import { type Express } from 'express'
import { type UpdateProductParams, type AddProductParams } from '@/core/ports/driving/services'
import request from 'supertest'
import env from '@/main/config/env'
import { sign } from 'jsonwebtoken'
import { setupApp } from '@/main/config/app'
import { MongoDBHelper } from '@/infrastructure/repositories/mongodb'

let productCollection: Collection
let accountCollection: Collection
const MONGO_URL = process.env.MONGO_URL || ''

let app: Express

const mockAddProductParams = (): AddProductParams => ({
  category: 'any_category',
  name: 'any_name',
  price: 'any_price',
  description: 'any_description',
  image: 'any_image'
})

const mockUpdateProductParams = (): UpdateProductParams => ({
  id: 'any_id',
  body: {
    category: 'other_category',
    name: 'any_name',
    price: 'any_price',
    description: 'any_description',
    image: 'any_image'
  }
})

describe('Product Routes', () => {
  beforeAll(async () => {
    app = setupApp()
    await MongoDBHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoDBHelper.disconnect()
  })

  beforeEach(async () => {
    productCollection = MongoDBHelper.getCollection('products')
    await productCollection.deleteMany({})
    accountCollection = MongoDBHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('GET /products', () => {
    test('Should return 403 on get products', async () => {
      await request(app)
        .get('/api/products')
        .send(mockAddProductParams())
        .expect(403)
    })

    test('Should return 403 on load products without accessToken', async () => {
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
        .get('/api/products')
        .send(mockAddProductParams())
        .expect(403)
    })

    test('Should return 200 on load products without accessToken', async () => {
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
        .get('/api/products')
        .set('authorization', `Bearer ${accessToken}`)
        .send(mockAddProductParams())
        .expect(204)
    })
  })

  describe('GET /products by id', () => {
    test('Should return 403 on get product by id if no accessToken is provided', async () => {
      await request(app)
        .get('/api/products/:id')
        .expect(403)
    })

    test('Should return 200 on load products with accessToken', async () => {
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
      const insertedProduct = await productCollection.insertOne(mockAddProductParams())
      const stringfiedId = insertedProduct.insertedId.toHexString()
      await request(app)
        .get(`/api/products/${stringfiedId}`)
        .set('authorization', `Bearer ${accessToken}`)
        .expect(200)
    })
  })

  describe('POST /products', () => {
    test('Should return 403 on create product without admin role', async () => {
      await request(app)
        .post('/api/products')
        .send(mockAddProductParams())
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
        .post('/api/products')
        .set('authorization', `Bearer ${accessToken}`)
        .send(mockAddProductParams())
        .expect(204)
    })
  })

  describe('DELETE /products/:id', () => {
    test('Should return 403 on delete product if no accessToken is provided', async () => {
      await request(app)
        .delete('/api/products/:id')
        .expect(403)
    })

    test('Should return 204 on delete product usign valid accessToken', async () => {
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
      const insertedProduct = await productCollection.insertOne(mockAddProductParams())
      const stringfiedId = insertedProduct.insertedId.toHexString()
      await request(app)
        .delete(`/api/products/${stringfiedId}`)
        .set('authorization', `Bearer ${accessToken}`)
        .send(mockAddProductParams())
        .expect(204)
    })
  })

  describe('PATCH /product', () => {
    test('Should return 403 on create product without admin role', async () => {
      await request(app)
        .patch('/api/products/:id')
        .send(mockAddProductParams())
        .expect(403)
    })

    test('Should return 204 on update product usign valid accessToken', async () => {
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
      const insertedProduct = await productCollection.insertOne(mockAddProductParams())
      const stringfiedId = insertedProduct.insertedId.toHexString()

      await request(app)
        .patch(`/api/products/${stringfiedId}`)
        .set('authorization', `Bearer ${accessToken}`)
        .send(mockUpdateProductParams().body)
        .expect(204)
    })
  })
})
