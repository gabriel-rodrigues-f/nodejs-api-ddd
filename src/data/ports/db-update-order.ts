import {
  type UpdateOrderParams,
  type UpdateOrder
} from '@/domain/ports'
import { type UpdateOrderRepository } from '@/data/adapters'

export class DbUpdateOrder implements UpdateOrder {
  constructor (private readonly repository: UpdateOrderRepository) { }
  async update (params: UpdateOrderParams): Promise<void> {
    await this.repository.updateOrder(params)
    return await Promise.resolve(null)
  }
}
