import { type LoadProductByCategory } from '@/data/protocols/db/product/load-product-by-category'
import {
  type HttpResponse,
  type Controller
} from '../add-product'

export class LoadProductByCategoryController implements Controller {
  constructor (private readonly loadProductByCategory: LoadProductByCategory) { }
  async handle (request: any): Promise<HttpResponse> {
    await this.loadProductByCategory.loadByCategory(request)
    return await Promise.resolve(null)
  }
}
