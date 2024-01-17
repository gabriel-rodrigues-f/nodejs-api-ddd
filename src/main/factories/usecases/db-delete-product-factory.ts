import { DbDeleteProduct } from '@/data/usecases/product/delete-product/db-delete-product'
import { type DeleteProduct } from '@/domain/usecases/product/delete-product'
import { ProductMongoRepository } from '@/infra/db/mongodb/product/product-mongo-repository'

export const makeDbDeleteProduct = (): DeleteProduct => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbDeleteProduct(productMongoRepository)
}
