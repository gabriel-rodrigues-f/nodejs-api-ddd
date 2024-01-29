import { DeleteProduct } from '@/data/ports'
import { type IDeleteProduct } from '@/domain/ports'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbDeleteProduct = (): IDeleteProduct => {
  const repository = new ProductMongoRepository()
  return new DeleteProduct(repository)
}
