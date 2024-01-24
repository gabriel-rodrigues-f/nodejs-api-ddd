import { type LoadOrders } from '@/domain/usecases'
import { DbLoadOrders } from '@/data/usecases'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadOrders = (): LoadOrders => {
  const orderMongoRepository = new OrderMongoRepository()
  return new DbLoadOrders(orderMongoRepository)
}
