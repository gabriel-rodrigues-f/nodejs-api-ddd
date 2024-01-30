import { type Order } from '@/core/entities'

export interface ILoadOrdersRepository {
  loadAll: (filter: any) => Promise<Order[]>
}
