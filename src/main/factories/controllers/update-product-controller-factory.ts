import { makeDbUpdateProduct } from '@/main/factories/usecases'
import { makeUpdateProductValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdateProductController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeUpdateProductController = (): Controller => {
  const controller = new UpdateProductController(makeUpdateProductValidation(), makeDbUpdateProduct())
  return makeLogControllerDecorator(controller)
}
