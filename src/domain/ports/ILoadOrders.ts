import { type Order } from '@/domain/models'

export interface ILoadOrders {
  loadAll: (filter: any) => Promise<Order[]>
}
