import { type ILoadProducts } from '@/domain/ports'
import { DbLoadProducts } from '@/data/ports'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadProducts = (): ILoadProducts => {
  const repository = new ProductMongoRepository()
  return new DbLoadProducts(repository)
}
