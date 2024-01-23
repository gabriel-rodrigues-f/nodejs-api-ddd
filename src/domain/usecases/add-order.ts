import { type Order } from '@/domain/models'

export type AddOrderParams = Omit<Order, 'number'>
export type AddOrderItemParams = Pick<Order, 'products'>
export type AddOrderDetailsParams = Omit<Order, 'number' | 'products'>

export interface AddOrder {
  add: (order: AddOrderParams) => Promise<Order>
}
