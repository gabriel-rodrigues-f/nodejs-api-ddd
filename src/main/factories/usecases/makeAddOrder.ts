import { type IAddOrder } from '@/core/ports/driving/services'
import { AddOrder } from '@/application/services'
import { OrderMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddOrder = (): IAddOrder => {
  const repository = new OrderMongoRepository()
  return new AddOrder(repository)
}
