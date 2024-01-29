import { type Logout } from '@/domain/usecases'
import { type HttpResponse, type Controller, type Validation } from '@/presentation/protocols'

export class LogoutController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly logout: Logout
  ) { }

  async handle (request: any): Promise<HttpResponse> {
    this.validation.validate(request.body)
    return await Promise.resolve(null)
  }
}
