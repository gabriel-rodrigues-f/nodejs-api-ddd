import { Collection } from 'mongodb'
import { AddProductModel } from '../../../../data/usecases/add-product/db-add-product-protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { ProductMongoRepository } from './product-mongo-repository'

let productCollection: Collection
const MONGO_URL = process.env.MONGO_URL || ''

describe('AddProductRepository', () => {
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

  const makeSut = (): ProductMongoRepository => {
    return new ProductMongoRepository()
  }

  const makeFakeAddProductModel = (): AddProductModel => ({
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

  test('Should return a product on AddProduct success', async () => {
    const sut = makeSut()
    await sut.add(makeFakeAddProductModel())
    const product = await productCollection.findOne({ name: 'any_name' })
    expect(product).toBeTruthy()
  })
})
