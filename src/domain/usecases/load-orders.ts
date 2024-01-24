import { type Order } from '@/domain/models'

export interface LoadOrders {
  load: (filter: any) => Promise<Order[]>
}
