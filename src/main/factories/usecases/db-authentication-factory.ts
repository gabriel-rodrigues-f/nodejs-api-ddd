import env from '@/main/config/env'
import { type IAuthentication } from '@/domain/ports'
import { DbAuthentication } from '@/data/ports'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { BcryptAdapter, JwtAdapter } from '@/infra/criptography'

export const makeDbAuthentication = (): IAuthentication => {
  const repository = new AccountMongoRepository()
  const bcrypt = new BcryptAdapter(12)
  const jwt = new JwtAdapter(env.JWT_SECRET)
  return new DbAuthentication(repository, bcrypt, jwt, repository)
}
