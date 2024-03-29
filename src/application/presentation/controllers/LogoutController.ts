import { type ILogout } from '@/core/ports/driving/services'
import { type IHTTPResponse, type IController, type IValidation } from '@/core/ports/driving/presentation'
import { badRequest, noContent, serverError } from '@/application/presentation/helpers'

export class LogoutController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly repository: ILogout
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
