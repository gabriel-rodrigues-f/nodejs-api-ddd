import { type IAddProduct } from '@/core/ports/driving/services'
import { AddProduct } from '@/application/services'
import { ProductMongoRepository } from '@/infrastructure/db/mongodb'

export const makeDbAddProduct = (): IAddProduct => {
  const repository = new ProductMongoRepository()
  return new AddProduct(repository)
}
