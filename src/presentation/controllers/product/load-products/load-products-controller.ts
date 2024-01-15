import { Controller, HttpRequest, HttpResponse, LoadProducts, ok, serverError } from '../load-products/load-products-controller-protocols'

export class LoadProductsController implements Controller {
  constructor (private readonly loadProducts: LoadProducts) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.loadProducts.load()
      return ok(products)
    } catch (error) {
      return serverError(error)
    }
  }
}
