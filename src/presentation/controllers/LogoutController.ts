import { type Logout } from '@/domain/ports'
import { type IHTTPResponse, type IController, type IValidation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers'

export class LogoutController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly repository: Logout
  ) { }

  async handle (request: any): Promise<IHTTPResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) return badRequest(error)
      const { email } = request.body
      await this.repository.logout(email)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
