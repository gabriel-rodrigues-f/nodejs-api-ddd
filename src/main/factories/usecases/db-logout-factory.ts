import { type Logout } from '@/domain/ports'
import { DbLogout } from '@/data/ports'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbLogout = (): Logout => {
  const repository = new AccountMongoRepository()
  return new DbLogout(repository)
}
