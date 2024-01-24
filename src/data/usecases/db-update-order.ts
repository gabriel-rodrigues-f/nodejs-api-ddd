import {
  type UpdateOrderParams,
  type UpdateOrder
} from '@/domain/usecases'
import { type UpdateOrderRepository } from '@/data/protocols'

export class DbUpdateOrder implements UpdateOrder {
  constructor (private readonly repository: UpdateOrderRepository) { }
  async update (params: UpdateOrderParams): Promise<void> {
    await this.repository.updateOrder(params)
    return await Promise.resolve(null)
  }
}
