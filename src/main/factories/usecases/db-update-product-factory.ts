import { type UpdateProduct } from '@/domain/ports'
import { DbUpdateProduct } from '@/data/ports'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbUpdateProduct = (): UpdateProduct => {
  const repository = new ProductMongoRepository()
  return new DbUpdateProduct(repository)
}
