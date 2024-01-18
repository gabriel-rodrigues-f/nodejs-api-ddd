import { type LoadProducts } from '@/domain/usecases'
import { DbLoadProducts } from '@/data/usecases'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadProducts = (): LoadProducts => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbLoadProducts(productMongoRepository)
}
