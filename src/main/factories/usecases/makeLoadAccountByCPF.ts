import { type ILoadAccountByCPF } from '@/domain/ports'
import { LoadACcountByCPF } from '@/data/ports'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadAccountByCpf = (): ILoadAccountByCPF => {
  const repository = new AccountMongoRepository()
  return new LoadACcountByCPF(repository)
}
