import { type IAddProduct } from '@/domain/ports'
import {
  badRequest,
  noContent,
  serverError
} from '@/presentation/helpers'
import {
  type IController,
  type Validation,
  type HttpRequest,
  type HttpResponse
} from '@/presentation/protocols'

export class AddProductController implements IController {
  constructor (
    private readonly validation: Validation,
    private readonly addProduct: IAddProduct
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) return badRequest(error)
      const { category, name, price, description, image } = request.body
      await this.addProduct.add({ category, name, price, description, image })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
