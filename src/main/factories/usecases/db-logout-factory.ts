import { type Logout } from '@/domain/usecases'
import { DbLogout } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbLogout = (): Logout => {
  const repository = new AccountMongoRepository()
  return new DbLogout(repository)
}
