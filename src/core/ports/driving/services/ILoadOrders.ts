import { type Order } from '@/core/entities'

export interface ILoadOrders {
  loadAll: (filter: any) => Promise<Order[]>
}
