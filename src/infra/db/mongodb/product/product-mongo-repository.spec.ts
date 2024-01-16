import { type Collection } from 'mongodb'
import { type AddProductModel, type ProductModel } from '@/data/usecases/add-product/db-add-product-protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { ProductMongoRepository } from './product-mongo-repository'

let productCollection: Collection
const MONGO_URL = process.env.MONGO_URL || ''

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

const makeFakeProducts = (): ProductModel[] => ([
  {
    id: 'any_id',
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
  },
  {
    id: 'other_id',
    category: 'other_category',
    name: 'other_name',
    price: 'other_price',
    nutritionalInformation: {
      calorie: 'other_calorie',
      carbohydrate: 'other_carbohydrate',
      total_sugars: 'other_total_sugars',
      added_sugars: 'other_added_sugars',
      proteins: 'other_proteins',
      total_fat: 'other_total_fat',
      saturated_fat: 'other_saturated_fat',
      trans_fats: 'other_trans_fats',
      dietary_fiber: 'other_dietary_fiber',
      sodium: 'other_sodium'
    }
  }
])

const makeFakeProduct = (): ProductModel => ({
  id: 'any_id',
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

const makeSut = (): ProductMongoRepository => {
  return new ProductMongoRepository()
}

describe('ProductRepository', () => {
  describe('add()', () => {
    test('Should return a product on AddProduct success', async () => {
      const sut = makeSut()
      await sut.add(makeFakeAddProductModel())
      const product = await productCollection.findOne({ name: 'any_name' })
      expect(product).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all products on success', async () => {
      await productCollection.insertMany(makeFakeProducts())
      const sut = makeSut()
      const products = await sut.loadAll()
      expect(products.length).toBe(2)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const products = await sut.loadAll()
      expect(products.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load a product on success', async () => {
      const response = await productCollection.insertOne(makeFakeProduct())
      const insertedId = response.insertedId.toHexString()
      const sut = makeSut()
      const product = await sut.loadById(insertedId)
      expect(product).toBeTruthy()
    })
  })
})
