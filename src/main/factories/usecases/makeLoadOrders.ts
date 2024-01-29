import { type ILoadOrders } from '@/domain/ports'
import { LoadOrders } from '@/data/ports'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadOrders = (): ILoadOrders => {
  const repository = new OrderMongoRepository()
  return new LoadOrders(repository)
}
