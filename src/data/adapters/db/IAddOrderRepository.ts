import { type Order } from '@/domain/models'

export type AddOrderParams = Omit<Order, 'number'>

export interface IAddOrderRepository {
  addOrderTransaction: (params: AddOrderParams) => Promise<Order>
}
