import { type UpdateOrderParams } from '@/domain/ports'

export interface UpdateOrderRepository {
  updateOrder: (params: UpdateOrderParams) => Promise<void>
}
