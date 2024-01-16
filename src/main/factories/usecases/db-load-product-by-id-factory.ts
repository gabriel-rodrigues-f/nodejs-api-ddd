import { DbLoadProductById } from '@/data/usecases/product/load-product-by-id/db-load-product-by-id'
import { type LoadProductById } from '@/domain/usecases/product/load-product-by-id'
import { ProductMongoRepository } from '@/infra/db/mongodb/product/product-mongo-repository'

export const makeDbLoadProductById = (): LoadProductById => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbLoadProductById(productMongoRepository)
}
