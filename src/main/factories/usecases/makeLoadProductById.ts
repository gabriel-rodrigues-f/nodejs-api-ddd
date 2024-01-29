import { type ILoadProductById } from '@/domain/ports'
import { LoadProductById } from '@/data/ports'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadProductById = (): ILoadProductById => {
  const repository = new ProductMongoRepository()
  return new LoadProductById(repository)
}
