import { type ILoadOrders } from '@/core/ports/driving/services'
import { LoadOrders } from '@/application/services'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadOrders = (): ILoadOrders => {
  const repository = new OrderMongoRepository()
  return new LoadOrders(repository)
}
