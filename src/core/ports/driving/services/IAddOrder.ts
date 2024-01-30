import { type Item, type Order } from '@/core/entities'
import { type ObjectId } from 'mongodb'

export type AddOrderParams = Omit<Order, 'number'>
export type AddOrderItemParams = Item & { orderId: ObjectId }
export type AddOrderDetailsParams = Omit<Order, 'number' | 'products'>

export interface IAddOrder {
  add: (params: AddOrderParams) => Promise<Order>
}
