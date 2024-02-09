import { type Order } from '@/core/entities'
import {
  type UpdateOrderParams,
  type AddOrderDetailsParams,
  type AddOrderItemParams,
  type AddOrderParams
} from '@/core/ports/driving/services'
import {
  type IUpdateOrderRepository,
  type IAddOrderRepository,
  type ILoadOrdersRepository
} from '@/core/ports/driven'
import { MongoDBHelper } from '@/infrastructure/repositories'
import { ObjectId } from 'mongodb'

export class OrderMongoRepository implements
  IAddOrderRepository,
  IUpdateOrderRepository,
  ILoadOrdersRepository {
  async addOrderTransaction (params: AddOrderParams): Promise<void> {
    const session = await MongoDBHelper.startTransaction()
    try {
      const { products, ...order } = params
      const insertedId = await this.addOrder(order)
      products.forEach(async product => await this.addOrderItem({ orderId: new ObjectId(insertedId), ...product }))
      await MongoDBHelper.commitTransaction(session)
    } catch (error) {
      await MongoDBHelper.abortTransaction(session)
      throw error
    }
  }

  async addOrder (params: AddOrderDetailsParams): Promise<string> {
    const collection = MongoDBHelper.getCollection('orders')
    const id = await collection.insertOne(params)
    return id.insertedId.toHexString()
  }

  async addOrderItem (params: AddOrderItemParams): Promise<void> {
    const collection = MongoDBHelper.getCollection('orderItems')
    await collection.insertOne(params)
  }

  async updateOrder (params: UpdateOrderParams): Promise<void> {
    const collection = MongoDBHelper.getCollection('orders')
    const { id, status } = params
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } })
  }

  async loadAll (filter: any): Promise<Order[]> {
    const collection = MongoDBHelper.getCollection('orders')
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
    return orders.map(orders => MongoDBHelper.map(orders))
  }
}
