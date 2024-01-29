import { type Order } from '@/domain/entities'

export interface ILoadOrdersRepository {
  loadAll: (filter: any) => Promise<Order[]>
}
