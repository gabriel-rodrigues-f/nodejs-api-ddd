import { DbDeleteProduct } from '@/data/usecases'
import { type DeleteProduct } from '@/domain/usecases'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbDeleteProduct = (): DeleteProduct => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbDeleteProduct(productMongoRepository)
}
