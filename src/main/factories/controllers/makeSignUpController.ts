import { makeSignUpValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAuthentication, makeDbAddAccount } from '@/main/factories/usecases'
import { type IController } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/SignUpController'

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
