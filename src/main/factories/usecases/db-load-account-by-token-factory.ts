import env from '@/main/config/env'
import { type LoadAccountByToken } from '@/domain/ports'
import { DbLoadAccountByToken } from '@/data/ports'
import { JwtAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwt = new JwtAdapter(env.JWT_SECRET)
  const repository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwt, repository)
}
