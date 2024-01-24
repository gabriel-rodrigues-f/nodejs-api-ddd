import { type AddOrder } from '@/domain/usecases'
import { DbAddOrder } from '@/data/usecases'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddOrder = (): AddOrder => {
  const orderMongoRepository = new OrderMongoRepository()
  return new DbAddOrder(orderMongoRepository)
}
