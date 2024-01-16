import { CompareFieldsValidation, EmailValidation, RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators/email/email-validator-adapter'
import { CpfValidation } from '@/validation/validators/cpf-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'cpf', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  validations.push(new CpfValidation('cpf'))
  return new ValidationComposite(validations)
}
