import { type ILogErrorRepository } from '@/data/adapters/db'
import {
  type IController,
  type HttpRequest,
  type HttpResponse
} from '@/presentation/protocols'

export class LogControllerDecorator implements IController {
  constructor (
    private readonly controller: IController,
    private readonly repository: ILogErrorRepository
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const response = await this.controller.handle(request)
    if (response.statusCode === 500) {
      await this.repository.logError(response.body.stack)
    }
    return response
  }
}
