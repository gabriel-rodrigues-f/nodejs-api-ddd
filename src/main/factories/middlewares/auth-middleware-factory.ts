import { makeDbLoadAccountByToken } from '@/main/factories/usecases/db-load-account-by-token-factory'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { type Middleware } from '@/presentation/protocols'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
