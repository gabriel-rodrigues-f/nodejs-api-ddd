import { type LoadAccountByCpf } from '@/domain/ports'
import { DbLoadAccountByCpf } from '@/data/ports'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadAccountByCpf = (): LoadAccountByCpf => {
  const repository = new AccountMongoRepository()
  return new DbLoadAccountByCpf(repository)
}
