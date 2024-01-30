import { makeDbAddProduct } from '@/main/factories/usecases'
import { makeAddProductValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { AddProductController } from '@/application/presentation/controllers'
import { type IController } from '@/core/ports/driving/presentation'

export const makeAddProductController = (): IController => {
  const controller = new AddProductController(makeAddProductValidation(), makeDbAddProduct())
  return makeLogControllerDecorator(controller)
}
