import { type UpdateOrder } from '@/domain/usecases'
import { DbUpdateOrder } from '@/data/usecases'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbUpdateOrder = (): UpdateOrder => {
  const repository = new OrderMongoRepository()
  return new DbUpdateOrder(repository)
}
