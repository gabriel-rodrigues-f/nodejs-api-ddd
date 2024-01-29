import { type Order } from '@/domain/entities'
import { type ILoadOrders } from '@/domain/ports'
import { type ILoadOrdersRepository } from '@/data/adapters'

export class LoadOrders implements ILoadOrders {
  constructor (private readonly repository: ILoadOrdersRepository) { }
  async loadAll (filter: any): Promise<Order[]> {
    return await this.repository.loadAll(filter)
  }
}
