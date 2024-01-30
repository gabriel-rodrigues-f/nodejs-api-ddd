import { type ILoadProducts } from '@/core/ports/driving/services'
import { LoadProducts } from '@/application/services'
import { ProductMongoRepository } from '@/infrastructure/db/mongodb'

export const makeDbLoadProducts = (): ILoadProducts => {
  const repository = new ProductMongoRepository()
  return new LoadProducts(repository)
}
