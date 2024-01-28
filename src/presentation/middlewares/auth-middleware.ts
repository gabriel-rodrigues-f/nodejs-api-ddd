import { type LoadAccountByToken } from '@/domain/usecases'
import {
  type Middleware,
  type HttpRequest,
  type HttpResponse
} from '@/presentation/protocols'
import { AccessDeniedError } from '@/presentation/errors'
import { ok, forbidden, serverError } from '@/presentation/helpers'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const authToken = request.headers.authorization
      if (!authToken) return forbidden(new AccessDeniedError())
      const [, token] = request.headers.authorization.split(' ')
      if (token) {
        const account = await this.loadAccountByToken.load(token, this.role)
        if (account) return ok({ accountId: account.id })
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
