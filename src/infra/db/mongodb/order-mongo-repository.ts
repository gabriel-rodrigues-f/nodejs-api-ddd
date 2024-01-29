import { type Order } from '@/domain/models'
import {
  type UpdateOrderParams,
  type AddOrderDetailsParams,
  type AddOrderItemParams,
  type AddOrderParams
} from '@/domain/ports'
import {
  type UpdateOrderRepository,
  type IAddOrderRepository,
  type LoadOrdersRepository
} from '@/data/adapters'
import { MongoHelper } from '@/infra/db'
import { ObjectId } from 'mongodb'

export class OrderMongoRepository implements
  IAddOrderRepository,
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

  async addOrder (params: AddOrderDetailsParams): Promise<string> {
    const collection = MongoHelper.getCollection('orders')
    const id = await collection.insertOne(params)
    return id.insertedId.toHexString()
  }

  async addOrderItem (params: AddOrderItemParams): Promise<void> {
    const collection = MongoHelper.getCollection('orderItems')
    await collection.insertOne(params)
  }

  async updateOrder (params: UpdateOrderParams): Promise<void> {
    const collection = MongoHelper.getCollection('orders')
    const { id, status } = params
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } })
  }

  async loadAll (filter: any): Promise<Order[]> {
    const collection = MongoHelper.getCollection('orders')
    const orders = await collection.aggregate<Order>([
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
