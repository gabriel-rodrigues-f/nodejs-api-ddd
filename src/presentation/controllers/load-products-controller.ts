import { type LoadProducts } from '@/domain/usecases'
import {
  ok,
  noContent,
  serverError
} from '@/presentation/helpers'
import {
  type Controller,
  type HttpResponse
} from '@/presentation/protocols'

export class LoadProductsController implements Controller {
  constructor (private readonly loadProducts: LoadProducts) { }
  async handle (): Promise<HttpResponse> {
    try {
      const products = await this.loadProducts.load()
      return (products.length > 0) ? ok(products) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
