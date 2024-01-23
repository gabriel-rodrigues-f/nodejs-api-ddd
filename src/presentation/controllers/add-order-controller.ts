import {
  type HttpResponse,
  type Controller,
  type Validation
} from '@/presentation/protocols'
import { badRequest } from '../helpers'

export class AddOrderController implements Controller {
  constructor (private readonly validation: Validation) { }
  async handle (request: any): Promise<HttpResponse> {
    const error = this.validation.validate(request.body)
    if (error) return badRequest(error)
    return await Promise.resolve(null)
  }
}
