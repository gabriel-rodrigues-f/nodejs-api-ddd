import { DbLoadProducts } from '@/data/usecases/product/load-products/db-load-products'
import { type LoadProducts } from '@/domain/usecases/product/load-products'
import { ProductMongoRepository } from '@/infra/db/mongodb/product/product-mongo-repository'

export const makeDbLoadProducts = (): LoadProducts => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbLoadProducts(productMongoRepository)
}
