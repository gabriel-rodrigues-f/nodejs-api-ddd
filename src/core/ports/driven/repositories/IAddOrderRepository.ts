import { type Order } from '@/core/entities'

export type AddOrderParams = Omit<Order, 'number'>

export interface IAddOrderRepository {
  addOrderTransaction: (params: AddOrderParams) => Promise<void>
}
