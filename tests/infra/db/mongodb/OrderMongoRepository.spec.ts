import { type Order } from '@/domain/models'
import {
  type AddOrderItemParams,
  type AddOrderDetailsParams,
  type AddOrderParams
} from '@/domain/ports'
import { MongoHelper, OrderMongoRepository } from '@/infra/db'
import { ObjectId, type Collection } from 'mongodb'

const mockSut = (): OrderMongoRepository => new OrderMongoRepository()

const mockAddOrderParams = (): AddOrderParams => ({
  customer: 'any_customer',
  products: [
    {
      id: '65aa013deca75aaae89c3a1b',
      totalItems: 2,
      unitPrice: 2000,
      amount: 4000
    },
    {
      id: '65aa013deca75aaae89c3a1c',
      totalItems: 3,
      unitPrice: 6000,
      amount: 6000
    }
  ],
  status: 'any_status',
  createdAt: new Date(),
  updatedAt: new Date(),
  amount: 4000
})

const mockOrderItemParams = (): AddOrderItemParams => ({
  orderId: new ObjectId('65aa013deca75aaae89c3a1c'),
  id: '65aa013deca75aaae89c3a1c',
  totalItems: 3,
  unitPrice: 6000,
  amount: 6000
})

const mockAddOrderDetailsParams = (): AddOrderDetailsParams => ({
  customer: 'any_customer',
  status: 'any_status',
  createdAt: new Date(),
  updatedAt: new Date(),
  amount: 4000
})

let ordersCollection: Collection
let orderItemsCollection: Collection
const MONGO_URL = process.env.MONGO_URL || ''

describe('OrderRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    ordersCollection = MongoHelper.getCollection('orders')
    orderItemsCollection = MongoHelper.getCollection('orderItems')
    await ordersCollection.deleteMany({})
    await orderItemsCollection.deleteMany({})
  })

  test('Should create an order on success', async () => {
    const sut = mockSut()
    await sut.addOrderTransaction(mockAddOrderParams())
    const order = await ordersCollection.findOne({ customer: 'any_customer' })
    expect(order).toBeTruthy()
  })

  test('Should create an orderItem on transaction success', async () => {
    const sut = mockSut()
    await sut.addOrderTransaction(mockAddOrderParams())
    const insertedTotalItems = await orderItemsCollection.findOne({ totalItems: 2 })
    const insertedUnitPrice = await orderItemsCollection.findOne({ unitPrice: 6000 })
    expect(insertedTotalItems).toBeTruthy()
    expect(insertedUnitPrice).toBeTruthy()
  })

  test('Should create an orderItem on success', async () => {
    const sut = mockSut()
    await sut.addOrderItem(mockOrderItemParams())
    const order = await orderItemsCollection.findOne({ orderId: new ObjectId('65aa013deca75aaae89c3a1c') })
    expect(order).toBeTruthy()
  })

  test('Should create an order on success', async () => {
    const sut = mockSut()
    await sut.addOrder(mockAddOrderDetailsParams())
    const order = await ordersCollection.findOne({ customer: 'any_customer' })
    expect(order).toBeTruthy()
  })

  describe('addOrderTransaction()', () => {
    test('Should delete a product on success', async () => {
      const response = await ordersCollection.insertOne(mockAddOrderParams())
      const insertedId = response.insertedId.toHexString()
      const sut = mockSut()
      await sut.updateOrder({ id: String(insertedId), status: 'updated_status' })
      const order = await ordersCollection.findOne<Order>({ _id: new ObjectId(insertedId) })
      expect(order.status).toBe('updated_status')
    })
  })

  describe('loadAll()', () => {
    test('Should load empty list', async () => {
      const sut = mockSut()
      const orders = await sut.loadAll({ category: 'any_category' })
      expect(orders.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load all orders on success', async () => {
      await ordersCollection.insertMany([mockAddOrderParams()])
      const sut = mockSut()
      const orderss = await sut.loadAll({ customer: 'any_customer' })
      expect(orderss.length).toBe(1)
    })
  })
})
