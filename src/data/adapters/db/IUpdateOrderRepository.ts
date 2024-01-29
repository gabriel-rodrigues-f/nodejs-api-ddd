import { type UpdateOrderParams } from '@/domain/ports'

export interface IUpdateOrderRepository {
  updateOrder: (params: UpdateOrderParams) => Promise<void>
}
