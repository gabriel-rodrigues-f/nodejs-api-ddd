import { type ILogout } from '@/core/ports/driving/services'
import { Logout } from '@/application/services'
import { AccountMongoRepository } from '@/infrastructure/db'

export const makeDbLogout = (): ILogout => {
  const repository = new AccountMongoRepository()
  return new Logout(repository)
}
