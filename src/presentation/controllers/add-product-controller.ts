import { type AddProduct } from '@/domain/usecases'
import {
  badRequest,
  noContent,
  serverError
} from '@/presentation/helpers'
import {
  type Controller,
  type Validation,
  type HttpRequest,
  type HttpResponse
} from '@/presentation/protocols'

export class AddProductController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProduct: AddProduct
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) return badRequest(error)
      const { category, name, price, nutritionalInformation } = request.body
      await this.addProduct.add({ category, name, price, nutritionalInformation })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
