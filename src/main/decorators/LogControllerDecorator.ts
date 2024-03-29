import { type ILogErrorRepository } from '@/core/ports/driven/repositories'
import {
  type IController,
  type IHTTPRequest,
  type IHTTPResponse
} from '@/core/ports/driving/presentation'

export class LogControllerDecorator implements IController {
  constructor (
    private readonly controller: IController,
    private readonly repository: ILogErrorRepository
  ) { }

  async handle (request: IHTTPRequest): Promise<IHTTPResponse> {
    const response = await this.controller.handle(request)
    if (response.statusCode === 500) {
      await this.repository.logError(response.body.stack)
    }
    return response
  }
}
