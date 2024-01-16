import { CompareFieldsValidation, EmailValidation, RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators/email/email-validator-adapter'
import { makeSignUpValidation } from './signup-validation-factory'
import { CpfValidation } from '@/validation/validators/cpf-validation'

jest.mock('@/validation/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  test('Should call validation using all validations ', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'cpf', 'email', 'password', 'passwordConfirmation']) { validations.push(new RequiredFieldsValidation(field)) }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    validations.push(new CpfValidation('cpf'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
