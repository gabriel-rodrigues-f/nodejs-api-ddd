import { type Logout } from '@/domain/usecases'
import { type HttpResponse, type Controller, type Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

export class LogoutController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly repository: Logout
  ) { }

  async handle (request: any): Promise<HttpResponse> {
    const error = this.validation.validate(request.body)
    if (error) return badRequest(error)
    await this.repository.logout(request.body)
    return await Promise.resolve(null)
  }
}
