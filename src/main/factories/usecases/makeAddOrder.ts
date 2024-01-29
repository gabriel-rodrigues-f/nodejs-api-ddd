import { type IAddOrder } from '@/domain/ports'
import { DbAddOrder } from '@/data/ports'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddOrder = (): IAddOrder => {
  const repository = new OrderMongoRepository()
  return new DbAddOrder(repository)
}
