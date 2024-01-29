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
  type IValidation,
  type IHTTPRequest,
  type IHTTPResponse
} from '@/presentation/protocols'
import { EmailInUse } from '../errors'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) { }

  async handle (request: IHTTPRequest): Promise<IHTTPResponse> {
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
      if (!account) return forbidden(new EmailInUse())
      const accessToken = await this.authentication.auth({ email, password })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
