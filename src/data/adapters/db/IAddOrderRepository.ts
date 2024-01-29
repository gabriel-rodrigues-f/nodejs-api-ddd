import { type Order } from '@/domain/entities'

export type AddOrderParams = Omit<Order, 'number'>

export interface IAddOrderRepository {
  addOrderTransaction: (params: AddOrderParams) => Promise<Order>
}
