import {
  CPFValidation,
  EmailValidation,
  ValidationComposite,
  CompareFieldsValidation,
  RequiredFieldsValidation
} from '@/validation/validators'
import { type IValidation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'cpf', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  validations.push(new CPFValidation('cpf'))
  return new ValidationComposite(validations)
}
