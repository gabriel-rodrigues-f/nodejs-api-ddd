import { DbLoadProductByCategory } from '@/data/usecases/product/load-product-by-category/db-load-product-by-category'
import { type LoadProductByCategory } from '@/domain/usecases/product/load-product-by-category'
import { ProductMongoRepository } from '@/infra/db/mongodb/product/product-mongo-repository'

export const makeDbLoadProductByCategory = (): LoadProductByCategory => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbLoadProductByCategory(productMongoRepository)
}
