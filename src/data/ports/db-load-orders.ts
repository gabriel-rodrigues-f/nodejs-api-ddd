import { type Order } from '@/domain/models'
import { type LoadOrders } from '@/domain/ports'
import { type ILoadOrdersRepository } from '@/data/adapters'

export class DbLoadOrders implements LoadOrders {
  constructor (private readonly repository: ILoadOrdersRepository) { }
  async loadAll (filter: any): Promise<Order[]> {
    return await this.repository.loadAll(filter)
  }
}
