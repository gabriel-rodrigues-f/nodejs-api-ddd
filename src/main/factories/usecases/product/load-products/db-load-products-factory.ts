import { DbLoadProducts } from '../../../../../data/usecases/load-products/db-load-products'
import { LoadProducts } from '../../../../../domain/usecases/load-products'
import { ProductMongoRepository } from '../../../../../infra/db/mongodb/product/product-mongo-repository'

export const makeDbLoadProducts = (): LoadProducts => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbLoadProducts(productMongoRepository)
}
