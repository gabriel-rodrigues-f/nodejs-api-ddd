import { type Order } from '@/domain/models'

export interface ILoadOrdersRepository {
  loadAll: (filter: any) => Promise<Order[]>
}
