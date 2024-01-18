import { makeSignUpValidation } from '@/main/factories/validations/signup-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log.controller-decorator-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/db-add-account-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/db-authentication-factory'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'

export const makeSignUpController = (): Controller => {
  const sighUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(sighUpController)
}
