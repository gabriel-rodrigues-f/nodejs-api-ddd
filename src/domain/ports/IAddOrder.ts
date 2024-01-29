import { type Product, type Order } from '@/domain/models'
import { type ObjectId } from 'mongodb'

export type AddOrderParams = Omit<Order, 'number'>
export type AddOrderItemParams = Product & { orderId: ObjectId }
export type AddOrderDetailsParams = Omit<Order, 'number' | 'products'>

export interface IAddOrder {
  add: (order: AddOrderParams) => Promise<Order>
}
