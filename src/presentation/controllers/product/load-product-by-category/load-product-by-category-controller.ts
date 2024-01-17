import { type LoadProductByCategory } from '@/data/protocols/db/product/load-product-by-category'
import {
  type HttpResponse,
  type Controller,
  notFound
} from '../add-product'

export class LoadProductByCategoryController implements Controller {
  constructor (private readonly loadProductByCategory: LoadProductByCategory) { }
  async handle (request: any): Promise<HttpResponse> {
    const product = await this.loadProductByCategory.loadByCategory(request)
    if (!product) return notFound()
    return await Promise.resolve(null)
  }
}
