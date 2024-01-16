import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type LoadProducts,
  noContent,
  ok,
  serverError
} from '.'

export class LoadProductsController implements Controller {
  constructor (private readonly loadProducts: LoadProducts) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.loadProducts.load()
      return (products.length > 0) ? ok(products) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
