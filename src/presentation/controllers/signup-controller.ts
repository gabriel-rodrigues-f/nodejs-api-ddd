import {
  type IAddAccount,
  type IAuthentication
} from '@/domain/ports'
import {
  ok,
  forbidden,
  badRequest,
  serverError
} from '@/presentation/helpers'
import {
  type IController,
  type Validation,
  type HttpRequest,
  type HttpResponse
} from '@/presentation/protocols'
import { EmailInUseError } from '../errors'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: Validation,
    private readonly authentication: IAuthentication
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) return badRequest(error)
      const { name, cpf, email, password } = request.body
      const account = await this.addAccount.add({
        name,
        cpf,
        email,
        password
      })
      if (!account) return forbidden(new EmailInUseError())
      const accessToken = await this.authentication.auth({ email, password })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
