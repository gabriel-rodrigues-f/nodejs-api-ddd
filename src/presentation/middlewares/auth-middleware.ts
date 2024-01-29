import { type ILoadAccountByToken } from '@/domain/ports'
import {
  type Middleware,
  type HttpRequest,
  type HttpResponse
} from '@/presentation/protocols'
import { AccessDeniedError } from '@/presentation/errors'
import { ok, forbidden, serverError } from '@/presentation/helpers'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: ILoadAccountByToken,
    private readonly role?: string
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const authToken = request.headers.authorization
      if (!authToken) return forbidden(new AccessDeniedError())
      const [, token] = authToken.split(' ')
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
