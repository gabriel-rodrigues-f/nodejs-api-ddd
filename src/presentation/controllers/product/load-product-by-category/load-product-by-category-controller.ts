import { type LoadProductByCategory } from '@/data/protocols/db/product/load-product-by-category'
import {
  type HttpResponse,
  type Controller,
  notFound,
  serverError
} from '../add-product'

export class LoadProductByCategoryController implements Controller {
  constructor (private readonly loadProductByCategory: LoadProductByCategory) { }
  async handle (request: any): Promise<HttpResponse> {
    try {
      const product = await this.loadProductByCategory.loadByCategory(request)
      if (!product) return notFound()
    } catch (error) {
      return serverError(error)
    }
  }
}
