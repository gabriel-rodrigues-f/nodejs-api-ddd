import { type Order } from '@/domain/models'

export interface LoadOrdersRepository {
  loadAll: (filter: any) => Promise<Order[]>
}
