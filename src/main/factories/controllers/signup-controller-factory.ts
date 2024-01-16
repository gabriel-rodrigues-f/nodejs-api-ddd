import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { makeSignUpValidation } from '../validations/signup-validation-factory'
import { makeLogControllerDecorator } from '../decorators/log.controller-decorator-factory'
import { makeDbAddAccount } from '../usecases/db-add-account-factory'
import { makeDbAuthentication } from '../usecases/db-authentication-factory'

export const makeSignUpController = (): Controller => {
  const sighUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(sighUpController)
}
