import { type Collection } from 'mongodb'
import { type ProductModel } from '@/domain/models'
import { type AddProductParams } from '@/domain/usecases'
import {
  MongoHelper,
  ProductMongoRepository
} from '@/infra/db'

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

const mockProducts = (): ProductModel[] => ([
  {
    id: 'any_id',
    category: 'any_category',
    name: 'any_name',
    price: 'any_price',
    description: 'any_description',
    image: 'any_image'
  },
  {
    id: 'other_id',
    category: 'other_category',
    name: 'other_name',
    price: 'other_price',
    description: 'other_description',
    image: 'other_image'
  }
])

const mockProduct = (): ProductModel => ({
  id: 'any_id',
  category: 'any_category',
  name: 'any_name',
  price: 'any_price',
  description: 'any_description',
  image: 'any_image'
})

const mockAddProductParams = (): AddProductParams => ({
  category: 'any_category',
  name: 'any_name',
  price: 'any_price',
  description: 'any_description',
  image: 'any_image'
})
const mockSut = (): ProductMongoRepository => {
  return new ProductMongoRepository()
}

describe('ProductRepository', () => {
  describe('add()', () => {
    test('Should return a product on AddProduct success', async () => {
      const sut = mockSut()
      await sut.add(mockAddProductParams())
      const product = await productCollection.findOne({ name: 'any_name' })
      expect(product).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all products on success', async () => {
      await productCollection.insertMany(mockProducts())
      const sut = mockSut()
      const products = await sut.loadAll({})
      expect(products.length).toBe(2)
    })

    test('Should load empty list', async () => {
      const sut = mockSut()
      const products = await sut.loadAll({})
      expect(products.length).toBe(0)
    })
  })

  describe('loadAll()', () => {
    test('Should load all products on success', async () => {
      await productCollection.insertMany(mockProducts())
      const sut = mockSut()
      const products = await sut.loadAll({ category: 'any_category' })
      expect(products.length).toBe(1)
    })

    test('Should load empty list', async () => {
      const sut = mockSut()
      const products = await sut.loadAll({ category: 'any_category' })
      expect(products.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load a product on success', async () => {
      const collection = await productCollection.insertOne(mockProduct())
      const insertedId = collection.insertedId.toHexString()
      const sut = mockSut()
      const product = await sut.loadById(insertedId)
      expect(product).toBeTruthy()
    })
  })

  describe('delete()', () => {
    test('Should delete a product on success', async () => {
      const collection = await productCollection.insertOne(mockProduct())
      const insertedId = collection.insertedId.toHexString()
      const sut = mockSut()
      await sut.delete(insertedId)
      const product = await sut.loadById(insertedId)
      expect(product).toBeNull()
    })
  })

  describe('update()', () => {
    test('Should update a product on success', async () => {
      const response = await productCollection.insertOne(mockAddProductParams())
      const insertedId = response.insertedId.toHexString()
      const sut = mockSut()
      const params = {
        id: insertedId,
        body: {
          category: 'other_category',
          name: 'other_name',
          price: 'other_price',
          description: 'other_description',
          image: 'other_image'
        }
      }
      await sut.update(params)
      const product = await sut.loadById(insertedId)
      expect(product.name).toBe('other_name')
      expect(product.image).toBe('other_image')
      expect(product.price).toBe('other_price')
      expect(product.category).toBe('other_category')
      expect(product.description).toBe('other_description')
    })
  })
})
