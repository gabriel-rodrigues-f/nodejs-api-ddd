import { makeLoginValidation } from '@/main/factories/validations'
import { makeDbAuthentication } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { LoginController } from '@/application/presentation/controllers'
import { type IController } from '@/core/ports/driving/presentation'

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
