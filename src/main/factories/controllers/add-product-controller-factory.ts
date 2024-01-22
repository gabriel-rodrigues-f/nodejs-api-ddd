import { makeDbAddProduct } from '@/main/factories/usecases'
import { makeAddProductValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { AddProductController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeAddProductController = (): Controller => {
  const controller = new AddProductController(makeAddProductValidation(), makeDbAddProduct())
  return makeLogControllerDecorator(controller)
}
