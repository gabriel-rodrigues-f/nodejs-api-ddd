import { DeleteProduct } from '@/application/services'
import { type IDeleteProduct } from '@/core/ports/driving/services'
import { ProductMongoRepository } from '@/infrastructure/repositories/mongodb'

export const makeDbDeleteProduct = (): IDeleteProduct => {
  const repository = new ProductMongoRepository()
  return new DeleteProduct(repository)
}
