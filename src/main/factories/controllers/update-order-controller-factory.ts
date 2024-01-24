import { makeDbUpdateOrder } from '@/main/factories/usecases'
import { makeUpdateOrderValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { UpdateOrderController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeUpdateOrderController = (): Controller => {
  const controller = new UpdateOrderController(makeUpdateOrderValidation(), makeDbUpdateOrder())
  return makeLogControllerDecorator(controller)
}
