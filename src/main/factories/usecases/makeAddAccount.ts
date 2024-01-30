import { type IAddAccount } from '@/core/ports/driving/services'
import { AddAccount } from '@/application/services'
import { BcryptAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddAccount = (): IAddAccount => {
  const salt = 12
  const bcrypt = new BcryptAdapter(salt)
  const repository = new AccountMongoRepository()
  return new AddAccount(bcrypt, repository, repository)
}
