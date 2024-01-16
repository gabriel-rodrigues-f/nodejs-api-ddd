import { DbLoadAccountByCpf } from '@/data/usecases/load-account-by-cpf/db-load-account-by-cpf'
import { type LoadAccountByCpf } from '@/domain/usecases/load-account-by-cpf'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'

export const makeDbLoadAccountByCpf = (): LoadAccountByCpf => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByCpf(accountMongoRepository)
}
