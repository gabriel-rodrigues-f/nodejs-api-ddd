import { type Order } from '@/domain/entities'

export interface ILoadOrders {
  loadAll: (filter: any) => Promise<Order[]>
}
