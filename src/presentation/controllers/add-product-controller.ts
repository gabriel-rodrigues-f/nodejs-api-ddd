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

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)
      const { category, name, price, nutritionalInformation } = httpRequest.body
      await this.addProduct.add({ category, name, price, nutritionalInformation })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}