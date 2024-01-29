import { type AddProduct } from '@/domain/usecases'
import { DbAddProduct } from '@/data/usecases'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddProduct = (): AddProduct => {
  const repository = new ProductMongoRepository()
  return new DbAddProduct(repository)
}
