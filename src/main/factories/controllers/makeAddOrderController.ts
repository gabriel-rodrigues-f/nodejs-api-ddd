import { makeDbAddOrder } from '@/main/factories/usecases'
import { makeAddOrderValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { AddOrderController } from '@/presentation/controllers'
import { type IController } from '@/presentation/protocols'

export const makeAddOrderController = (): IController => {
  const controller = new AddOrderController(makeAddOrderValidation(), makeDbAddOrder())
  return makeLogControllerDecorator(controller)
}
