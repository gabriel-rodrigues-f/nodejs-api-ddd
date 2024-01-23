import { type Order } from '@/domain/models'

export type AddOrderParams = Omit<Order, 'number'>

export interface AddOrderRepository {
  addOrderTransaction: (params: AddOrderParams) => Promise<Order>
}
