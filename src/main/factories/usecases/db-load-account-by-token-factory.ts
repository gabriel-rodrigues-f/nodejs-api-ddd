import env from '@/main/config/env'
import { type ILoadAccountByToken } from '@/domain/ports'
import { DbLoadAccountByToken } from '@/data/ports'
import { JwtAdapter } from '@/infra/criptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwt = new JwtAdapter(env.JWT_SECRET)
  const repository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwt, repository)
}
