import { type IAddProduct } from '@/domain/ports'
import { DbAddProduct } from '@/data/ports'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddProduct = (): IAddProduct => {
  const repository = new ProductMongoRepository()
  return new DbAddProduct(repository)
}
