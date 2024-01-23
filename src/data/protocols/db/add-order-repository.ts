import { type Order } from '@/domain/models'

export type AddOrderParams = Omit<Order, 'number'>

export interface AddOrderRepository {
  add: (params: AddOrderParams) => Promise<Order>
}
