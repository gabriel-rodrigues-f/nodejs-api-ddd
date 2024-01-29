import { type ILoadProducts } from '@/domain/ports'
import { LoadProducts } from '@/data/ports'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadProducts = (): ILoadProducts => {
  const repository = new ProductMongoRepository()
  return new LoadProducts(repository)
}
