import { type UpdateOrder } from '@/domain/ports'
import { DbUpdateOrder } from '@/data/ports'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbUpdateOrder = (): UpdateOrder => {
  const repository = new OrderMongoRepository()
  return new DbUpdateOrder(repository)
}
