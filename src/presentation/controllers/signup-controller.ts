import {
  type AddAccount,
  type Authentication
} from '@/domain/usecases'
import {
  ok,
  forbidden,
  badRequest,
  serverError
} from '@/presentation/helpers'
import {
  type Controller,
  type Validation,
  type HttpRequest,
  type HttpResponse
} from '@/presentation/protocols'
import { EmailInUseError } from '../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
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
