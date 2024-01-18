import { makeDbAddProduct } from '@/main/factories/usecases'
import { makeAddProductValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { type Controller } from '@/presentation/protocols'
import { AddProductController } from '@/presentation/controllers'

export const makeAddProductController = (): Controller => {
  const controller = new AddProductController(makeAddProductValidation(), makeDbAddProduct())
  return makeLogControllerDecorator(controller)
}
