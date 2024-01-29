import {
  type HttpResponse,
  type IController,
  type Validation
} from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '../helpers'
import { type IAddOrder } from '@/domain/ports/IAddOrder'

export class AddOrderController implements IController {
  constructor (
    private readonly validation: Validation,
    private readonly addOrder: IAddOrder
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
