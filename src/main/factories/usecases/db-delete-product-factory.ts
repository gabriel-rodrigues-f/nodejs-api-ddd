import { DbDeleteProduct } from '@/data/ports'
import { type DeleteProduct } from '@/domain/ports'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbDeleteProduct = (): DeleteProduct => {
  const repository = new ProductMongoRepository()
  return new DbDeleteProduct(repository)
}
