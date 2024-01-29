import { type UpdateProduct } from '@/domain/usecases'
import { DbUpdateProduct } from '@/data/usecases'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbUpdateProduct = (): UpdateProduct => {
  const repository = new ProductMongoRepository()
  return new DbUpdateProduct(repository)
}
