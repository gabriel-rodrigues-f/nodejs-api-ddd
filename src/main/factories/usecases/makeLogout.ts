import { type ILogout } from '@/domain/ports'
import { DbLogout } from '@/data/ports'
import { AccountMongoRepository } from '@/infra/db'

export const makeDbLogout = (): ILogout => {
  const repository = new AccountMongoRepository()
  return new DbLogout(repository)
}
