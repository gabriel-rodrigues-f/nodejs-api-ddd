import { type UpdateOrderParams } from '@/domain/usecases'

export interface UpdateOrderRepository {
  updateOrder: (params: UpdateOrderParams) => Promise<void>
}
