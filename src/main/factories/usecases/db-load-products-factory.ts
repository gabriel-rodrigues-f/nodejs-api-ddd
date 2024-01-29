import { type LoadProducts } from '@/domain/ports'
import { DbLoadProducts } from '@/data/ports'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadProducts = (): LoadProducts => {
  const repository = new ProductMongoRepository()
  return new DbLoadProducts(repository)
}
