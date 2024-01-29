import { type IUpdateProduct } from '@/domain/ports'
import { DbUpdateProduct } from '@/data/ports'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbUpdateProduct = (): IUpdateProduct => {
  const repository = new ProductMongoRepository()
  return new DbUpdateProduct(repository)
}
