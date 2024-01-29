import { makeDbUpdateProduct } from '@/main/factories/usecases'
import { makeUpdateProductValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdateProductController } from '@/presentation/controllers'
import { type IController } from '@/presentation/protocols'

export const makeUpdateProductController = (): IController => {
  const controller = new UpdateProductController(makeUpdateProductValidation(), makeDbUpdateProduct())
  return makeLogControllerDecorator(controller)
}
