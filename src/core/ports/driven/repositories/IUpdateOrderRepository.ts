import { type UpdateOrderParams } from '@/core/ports/driving/services'

export interface IUpdateOrderRepository {
  updateOrder: (params: UpdateOrderParams) => Promise<void>
}
