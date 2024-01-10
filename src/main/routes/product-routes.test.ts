import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let productCollection: Collection
const MONGO_URL = process.env.MONGO_URL || ''

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
  })

  describe('POST /products', () => {
    test('Should return 204 on product', async () => {
      await request(app)
        .post('/api/products')
        .send({
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
        .expect(204)
    })
  })
})
