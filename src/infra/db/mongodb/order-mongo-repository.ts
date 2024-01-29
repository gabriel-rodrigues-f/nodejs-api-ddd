import { type Order } from '@/domain/models'
import {
  type UpdateOrderParams,
  type AddOrderDetailsParams,
  type AddOrderItemParams,
  type AddOrderParams
} from '@/domain/ports'
import {
  type UpdateOrderRepository,
  type AddOrderRepository,
  type LoadOrdersRepository
} from '@/data/adapters'
import { MongoHelper } from '@/infra/db'
import { ObjectId } from 'mongodb'

export class OrderMongoRepository implements
  AddOrderRepository,
  UpdateOrderRepository,
  LoadOrdersRepository {
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

  async loadAll (filter: any): Promise<Order[]> {
    const ordersCollection = MongoHelper.getCollection('orders')
    const orders = await ordersCollection.aggregate<Order>([
      {
        $match: filter
      },
      {
        $lookup: {
          from: 'orderItems',
          localField: '_id',
          foreignField: 'orderId',
          as: 'items'
        }
      },
      {
        $addFields: {
          items: {
            $filter: {
              input: '$items',
              as: 'orderItem',
              cond: {
                $eq: ['$$orderItem.orderId', '$_id']
              }
            }
          }
        }
      },
      {
        $project: {
          'items._id': 0 // Alterado para 'items'
        }
      }
    ]
    ).toArray()
    return orders.map(orders => MongoHelper.map(orders))
  }
}
