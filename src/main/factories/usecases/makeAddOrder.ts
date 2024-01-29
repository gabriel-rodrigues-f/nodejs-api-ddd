import { type IAddOrder } from '@/domain/ports'
import { AddOrder } from '@/data/ports'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddOrder = (): IAddOrder => {
  const repository = new OrderMongoRepository()
  return new AddOrder(repository)
}
