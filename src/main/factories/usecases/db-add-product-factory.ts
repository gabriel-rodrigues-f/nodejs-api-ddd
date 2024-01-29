import { type AddProduct } from '@/domain/ports'
import { DbAddProduct } from '@/data/ports'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddProduct = (): AddProduct => {
  const repository = new ProductMongoRepository()
  return new DbAddProduct(repository)
}
