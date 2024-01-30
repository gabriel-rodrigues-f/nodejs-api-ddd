import { type ILogout } from '@/core/ports/driving/services'
import { Logout } from '@/application/services'
import { AccountMongoRepository } from '@/infrastructure/repositories'

export const makeDbLogout = (): ILogout => {
  const repository = new AccountMongoRepository()
  return new Logout(repository)
}
