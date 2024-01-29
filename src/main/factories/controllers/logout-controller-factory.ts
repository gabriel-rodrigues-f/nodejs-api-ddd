import { makeLogoutValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { LogoutController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbLogout } from '../usecases/db-logout-factory'

export const makeLogoutController = (): Controller => {
  const controller = new LogoutController(makeLogoutValidation(), makeDbLogout())
  return makeLogControllerDecorator(controller)
}
