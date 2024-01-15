import { Controller, HttpRequest, HttpResponse, LoadProducts } from '../load-products/load-products-controller-protocols'

export class LoadProductsController implements Controller {
  constructor (private readonly loadProducts: LoadProducts) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadProducts.load()
    return null
  }
}
