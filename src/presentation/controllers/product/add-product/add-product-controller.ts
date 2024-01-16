import {
  type AddProduct,
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type Validation,
  badRequest,
  noContent,
  serverError
} from './add-product-controller-protocols'

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
