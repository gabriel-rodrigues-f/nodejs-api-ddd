import {
  type HttpResponse,
  type Controller,
  type Validation
} from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '../helpers'
import { type AddOrder } from '@/domain/ports/add-order'

export class AddOrderController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOrder: AddOrder
  ) { }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) return badRequest(error)
      await this.addOrder.add(request.body)
      return noContent()
    } catch (error) { return serverError(error) }
  }
}
