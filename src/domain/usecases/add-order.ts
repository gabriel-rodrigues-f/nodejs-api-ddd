import { type Order } from '@/domain/models'

export type AddOrderParams = Omit<Order, 'number'>

export interface AddOrder {
  add: (order: AddOrderParams) => Promise<Order>
}
