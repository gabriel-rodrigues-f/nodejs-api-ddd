import {
  type LoadProductByCategory,
  type HttpResponse,
  type Controller,
  notFound,
  serverError,
  ok
} from './index'

export class LoadProductByCategoryController implements Controller {
  constructor (private readonly loadProductByCategory: LoadProductByCategory) { }
  async handle (request: any): Promise<HttpResponse> {
    try {
      const product = await this.loadProductByCategory.loadByCategory(request)
      if (!product) return notFound()
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}
