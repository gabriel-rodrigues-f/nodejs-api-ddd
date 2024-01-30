import { DeleteProduct } from '@/application/services'
import { type IDeleteProduct } from '@/core/ports/driving/services'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbDeleteProduct = (): IDeleteProduct => {
  const repository = new ProductMongoRepository()
  return new DeleteProduct(repository)
}
