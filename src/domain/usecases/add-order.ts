import { type Product, type Order } from '@/domain/models'

export type AddOrderParams = Omit<Order, 'number'>
export type AddOrderItemParams = Product & { orderId: string }
export type AddOrderDetailsParams = Omit<Order, 'number' | 'products'>

export interface AddOrder {
  add: (order: AddOrderParams) => Promise<Order>
}
