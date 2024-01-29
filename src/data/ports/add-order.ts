import { type Order } from '@/domain/entities'
import { type IAddOrder, type AddOrderParams } from '@/domain/ports'
import { type IAddOrderRepository } from '@/data/adapters'

export class DbAddOrder implements IAddOrder {
  constructor (private readonly repository: IAddOrderRepository) { }
  async add (params: AddOrderParams): Promise<Order> {
    await this.repository.addOrderTransaction(params)
    return await Promise.resolve(null)
  }
}
