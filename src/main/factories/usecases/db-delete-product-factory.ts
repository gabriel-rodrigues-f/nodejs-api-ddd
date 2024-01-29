import { DbDeleteProduct } from '@/data/usecases'
import { type DeleteProduct } from '@/domain/usecases'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbDeleteProduct = (): DeleteProduct => {
  const repository = new ProductMongoRepository()
  return new DbDeleteProduct(repository)
}
