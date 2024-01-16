import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { type AddProductModel } from '@/domain/usecases/add-product'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let productCollection: Collection
let accountCollection: Collection
const MONGO_URL = process.env.MONGO_URL || ''

const makeFakeAddProduct = (): AddProductModel => ({
  category: 'any_category',
  name: 'any_name',
  price: 'any_price',
  nutritionalInformation: {
    calorie: 'any_calorie',
    carbohydrate: 'any_carbohydrate',
    total_sugars: 'any_total_sugars',
    added_sugars: 'any_added_sugars',
    proteins: 'any_proteins',
    total_fat: 'any_total_fat',
    saturated_fat: 'any_saturated_fat',
    trans_fats: 'any_trans_fats',
    dietary_fiber: 'any_dietary_fiber',
    sodium: 'any_sodium'
  }
})

describe('Product Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    productCollection = MongoHelper.getCollection('products')
    await productCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /products', () => {
    test('Should return 403 on product', async () => {
      await request(app)
        .post('/api/products')
        .send(makeFakeAddProduct())
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
        .set('x-access-token', accessToken)
        .send(makeFakeAddProduct())
        .expect(204)
    })
  })

  describe('GET /products', () => {
    test('Should return 403 on product', async () => {
      await request(app)
        .post('/api/products')
        .send(makeFakeAddProduct())
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
        .send(makeFakeAddProduct())
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
        .set('x-access-token', accessToken)
        .send(makeFakeAddProduct())
        .expect(204)
    })
  })

  describe('GET /products/:productId/product', () => {
    test('Should return 403 on product if no accessToken is provided', async () => {
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
      const insertedProduct = await productCollection.insertOne(makeFakeAddProduct())
      const stringfiedId = insertedProduct.insertedId.toHexString()
      await request(app)
        .get(`/api/products/${stringfiedId}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
