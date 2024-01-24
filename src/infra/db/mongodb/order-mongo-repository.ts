import { type Order } from '@/domain/models'
import {
  type UpdateOrderParams,
  type AddOrderDetailsParams,
  type AddOrderItemParams,
  type AddOrderParams
} from '@/domain/usecases'
import {
  type UpdateOrderRepository,
  type AddOrderRepository
} from '@/data/protocols'
import { MongoHelper } from '@/infra/db'
import { ObjectId } from 'mongodb'

export class OrderMongoRepository implements
  AddOrderRepository,
  UpdateOrderRepository {
  async addOrderTransaction (params: AddOrderParams): Promise<Order> {
    const session = await MongoHelper.startTransaction()
    try {
      const { products, ...order } = params
      const insertedId = await this.addOrder(order)
      products.forEach(async product => await this.addOrderItem({ orderId: new ObjectId(insertedId), ...product }))
      await MongoHelper.commitTransaction(session)
      return await Promise.resolve(null)
    } catch (error) {
      await MongoHelper.abortTransaction(session)
      throw error
    }
  }

  async addOrder (order: AddOrderDetailsParams): Promise<string> {
    const orderCollection = MongoHelper.getCollection('orders')
    const id = await orderCollection.insertOne(order)
    return id.insertedId.toHexString()
  }

  async addOrderItem (orderItem: AddOrderItemParams): Promise<void> {
    const orderItemCollection = MongoHelper.getCollection('orderItems')
    await orderItemCollection.insertOne(orderItem)
  }

  async updateOrder (params: UpdateOrderParams): Promise<void> {
    const productCollection = MongoHelper.getCollection('orders')
    const { id, status } = params
    await productCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status } })
  }
}
