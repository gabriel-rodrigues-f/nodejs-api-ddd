import { type AddAccount } from '@/domain/ports'
import { DbAddAccount } from '@/data/ports'
import { BcryptAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcrypt = new BcryptAdapter(salt)
  const repository = new AccountMongoRepository()
  return new DbAddAccount(bcrypt, repository, repository)
}
