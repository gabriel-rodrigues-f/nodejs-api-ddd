import {
  type HttpResponse,
  type Controller,
  type Validation
} from '@/presentation/protocols'

export class AddOrderController implements Controller {
  constructor (private readonly validation: Validation) { }
  async handle (request: any): Promise<HttpResponse> {
    this.validation.validate(request.body)
    return await Promise.resolve(null)
  }
}
