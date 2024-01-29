import { type IAddProduct } from '@/domain/ports'
import {
  badRequest,
  noContent,
  serverError
} from '@/presentation/helpers'
import {
  type IController,
  type IValidation,
  type IHTTPRequest,
  type IHTTPResponse
} from '@/presentation/protocols'

export class AddProductController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addProduct: IAddProduct
  ) { }

  async handle (request: IHTTPRequest): Promise<IHTTPResponse> {
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
