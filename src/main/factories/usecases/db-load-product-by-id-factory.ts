import { type LoadProductById } from '@/domain/ports'
import { DbLoadProductById } from '@/data/ports'
import { ProductMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadProductById = (): LoadProductById => {
  const repository = new ProductMongoRepository()
  return new DbLoadProductById(repository)
}
