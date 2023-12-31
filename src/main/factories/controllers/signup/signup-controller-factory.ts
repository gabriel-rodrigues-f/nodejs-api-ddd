import { makeSignUpValidation } from './signup-validation-factory'
import { makeLogControllerDecorator } from '../../decorators/log.controller-decorator-factory'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'

export const makeSignUpController = (): Controller => {
  const sighUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(sighUpController)
}
