import {
  type UpdateOrderParams,
  type IUpdateOrder
} from '@/core/ports/driving/services'
import { type IUpdateOrderRepository } from '@/core/ports/driven'

export class UpdateOrder implements IUpdateOrder {
  constructor (private readonly repository: IUpdateOrderRepository) { }
  async update (params: UpdateOrderParams): Promise<void> {
    await this.repository.updateOrder(params)
    return await Promise.resolve(null)
  }
}
