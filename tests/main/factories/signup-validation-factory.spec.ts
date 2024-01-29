import { type Validation } from '@/presentation/protocols'
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite
} from '@/validation/validators'
import { CpfValidation } from '@/validation/validators/cpf-validation'
import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter'
import { makeSignUpValidation } from '@/main/factories/validations/signup-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'cpf', 'email', 'password', 'passwordConfirmation']) { validations.push(new RequiredFieldsValidation(field)) }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    validations.push(new CpfValidation('cpf'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
