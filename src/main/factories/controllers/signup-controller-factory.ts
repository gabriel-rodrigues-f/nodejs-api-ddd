import { makeSignUpValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAuthentication, makeDbAddAccount } from '@/main/factories/usecases'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/signup-controller'

export const makeSignUpController = (): Controller => {
  const sighUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(sighUpController)
}
