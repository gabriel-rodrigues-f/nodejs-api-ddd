import { type LogErrorRepository } from '@/data/protocols/db'
import {
  type Controller,
  type HttpRequest,
  type HttpResponse
} from '@/presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
