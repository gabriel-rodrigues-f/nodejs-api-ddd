import { type AddOrder } from '@/domain/usecases'
import { DbAddOrder } from '@/data/usecases'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddOrder = (): AddOrder => {
  const repository = new OrderMongoRepository()
  return new DbAddOrder(repository)
}
