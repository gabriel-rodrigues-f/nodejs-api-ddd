import { makeDbDeleteProduct } from '@/main/factories/usecases/'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { type Controller } from '@/presentation/protocols'
import { DeleteProductController } from '@/presentation/controllers'

export const makeDeleteProductController = (): Controller => {
  const controller = new DeleteProductController(makeDbDeleteProduct())
  return makeLogControllerDecorator(controller)
}
