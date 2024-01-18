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
      const accessToken = request.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) return ok({ accountId: account.id })
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
