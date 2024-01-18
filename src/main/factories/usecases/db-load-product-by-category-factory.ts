import { type LoadProductByCategory } from '@/domain/usecases'
import { DbLoadProductByCategory } from '@/data/usecases'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadProductByCategory = (): LoadProductByCategory => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbLoadProductByCategory(productMongoRepository)
}
