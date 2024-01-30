import { makeLogoutValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { LogoutController } from '@/application/presentation/controllers'
import { type IController } from '@/core/ports/driving/presentation'
import { makeDbLogout } from '@/main/factories/usecases'

export const makeLogoutController = (): IController => {
  const controller = new LogoutController(makeLogoutValidation(), makeDbLogout())
  return makeLogControllerDecorator(controller)
}
