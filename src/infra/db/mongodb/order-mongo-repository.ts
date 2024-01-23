import { type Order } from '@/domain/models'
import { type AddOrderParams } from '@/domain/usecases'
import { type AddOrderRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/db'

export class OrderMongoRepository implements AddOrderRepository {
  async add (params: AddOrderParams): Promise<Order> {
    const { products, ...order } = params
    const productCollection = MongoHelper.getCollection('orders')
    await productCollection.insertOne(order)
    return await Promise.resolve(null)
  }
}
