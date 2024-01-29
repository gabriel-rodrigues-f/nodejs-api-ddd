import { type Order } from '@/domain/models'
import { type AddOrder, type AddOrderParams } from '@/domain/ports'
import { type AddOrderRepository } from '@/data/adapters'

export class DbAddOrder implements AddOrder {
  constructor (private readonly repository: AddOrderRepository) { }
  async add (order: AddOrderParams): Promise<Order> {
    await this.repository.addOrderTransaction(order)
    return await Promise.resolve(null)
  }
}
