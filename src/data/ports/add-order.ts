import { type Order } from '@/domain/models'
import { type AddOrder, type AddOrderParams } from '@/domain/ports'
import { type IAddOrderRepository } from '@/data/adapters'

export class DbAddOrder implements AddOrder {
  constructor (private readonly repository: IAddOrderRepository) { }
  async add (params: AddOrderParams): Promise<Order> {
    await this.repository.addOrderTransaction(params)
    return await Promise.resolve(null)
  }
}
