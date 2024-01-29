import { type AddOrder } from '@/domain/ports'
import { DbAddOrder } from '@/data/ports'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddOrder = (): AddOrder => {
  const repository = new OrderMongoRepository()
  return new DbAddOrder(repository)
}
