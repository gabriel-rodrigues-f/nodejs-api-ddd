import { type Order } from '@/core/entities'
import { type IAddOrder, type AddOrderParams } from '@/core/ports/driving/services'
import { type IAddOrderRepository } from '@/core/ports/driven'

export class AddOrder implements IAddOrder {
  constructor (private readonly repository: IAddOrderRepository) { }
  async add (params: AddOrderParams): Promise<Order> {
    await this.repository.addOrderTransaction(params)
    return await Promise.resolve(null)
  }
}
