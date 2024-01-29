import { type IUpdateOrder } from '@/domain/ports'
import { UpdateOrder } from '@/data/ports'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbUpdateOrder = (): IUpdateOrder => {
  const repository = new OrderMongoRepository()
  return new UpdateOrder(repository)
}
