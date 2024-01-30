import { type IUpdateProduct } from '@/core/ports/driving/services'
import { UpdateProduct } from '@/application/services'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbUpdateProduct = (): IUpdateProduct => {
  const repository = new ProductMongoRepository()
  return new UpdateProduct(repository)
}
