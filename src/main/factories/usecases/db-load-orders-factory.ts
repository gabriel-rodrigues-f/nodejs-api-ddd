import { type LoadOrders } from '@/domain/ports'
import { DbLoadOrders } from '@/data/ports'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadOrders = (): LoadOrders => {
  const repository = new OrderMongoRepository()
  return new DbLoadOrders(repository)
}
