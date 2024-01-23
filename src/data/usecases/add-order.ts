import { type Order } from '@/domain/models'
import { type AddOrder, type AddOrderParams } from '@/domain/usecases'
import { type AddOrderRepository } from '@/data/protocols'

export class DbAddOrder implements AddOrder {
  constructor (private readonly repository: AddOrderRepository) { }
  async add (order: AddOrderParams): Promise<Order> {
    await this.repository.add(order)
    return await Promise.resolve(null)
  }
}
