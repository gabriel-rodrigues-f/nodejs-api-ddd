import { makeLogoutValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { LogoutController } from '@/presentation/controllers'
import { type IController } from '@/presentation/protocols'
import { makeDbLogout } from '@/main/factories/usecases'

export const makeLogoutController = (): IController => {
  const controller = new LogoutController(makeLogoutValidation(), makeDbLogout())
  return makeLogControllerDecorator(controller)
}
