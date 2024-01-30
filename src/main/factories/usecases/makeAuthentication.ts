import env from '@/main/config/env'
import { type IAuthentication } from '@/core/ports/driving/services'
import { Authentication } from '@/application/services'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { BcryptAdapter, JwtAdapter } from '@/infra/criptography'

export const makeDbAuthentication = (): IAuthentication => {
  const repository = new AccountMongoRepository()
  const bcrypt = new BcryptAdapter(12)
  const jwt = new JwtAdapter(env.JWT_SECRET)
  return new Authentication(repository, bcrypt, jwt, repository)
}
