import { type Order } from '@/domain/models'

export interface LoadOrders {
  loadAll: (filter: any) => Promise<Order[]>
}
