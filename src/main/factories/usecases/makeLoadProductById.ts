import { type ILoadProductById } from '@/core/ports/driving/services'
import { LoadProductById } from '@/application/services'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadProductById = (): ILoadProductById => {
  const repository = new ProductMongoRepository()
  return new LoadProductById(repository)
}
