import { type UpdateOrderParams } from '@/domain/usecases'

export interface UpdateOrderRepository {
  update: (params: UpdateOrderParams) => Promise<void>
}
