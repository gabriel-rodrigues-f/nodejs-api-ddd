import { type Order } from '@/core/entities'
import { type ILoadOrders } from '@/core/ports/driving/services'
import { type ILoadOrdersRepository } from '@/core/ports/driven'

export class LoadOrders implements ILoadOrders {
  constructor (private readonly repository: ILoadOrdersRepository) { }
  async loadAll (filter: any): Promise<Order[]> {
    return await this.repository.loadAll(filter)
  }
}
