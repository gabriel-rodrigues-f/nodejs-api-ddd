import { type ILoadProductById } from '@/domain/ports'
import { DbLoadProductById } from '@/data/ports'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadProductById = (): ILoadProductById => {
  const repository = new ProductMongoRepository()
  return new DbLoadProductById(repository)
}
