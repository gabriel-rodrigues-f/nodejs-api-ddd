import { type LoadAccountByCpf } from '@/domain/usecases'
import { DbLoadAccountByCpf } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadAccountByCpf = (): LoadAccountByCpf => {
  const repository = new AccountMongoRepository()
  return new DbLoadAccountByCpf(repository)
}
