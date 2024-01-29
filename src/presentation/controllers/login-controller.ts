import { type IAuthentication } from '@/domain/ports'
import {
  ok,
  badRequest,
  serverError,
  unauthorized
} from '@/presentation/helpers'
import {
  type IController,
  type Validation,
  type HttpRequest,
  type HttpResponse
} from '@/presentation/protocols'

export class LoginController implements IController {
  constructor (
    private readonly authentication: IAuthentication,
    private readonly validation: Validation
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) return badRequest(error)
      const { email, password } = request.body
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) return unauthorized()
      return ok({ access_token: accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
