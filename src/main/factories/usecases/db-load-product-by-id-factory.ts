import { type LoadProductById } from '@/domain/usecases'
import { DbLoadProductById } from '@/data/usecases'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadProductById = (): LoadProductById => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbLoadProductById(productMongoRepository)
}
