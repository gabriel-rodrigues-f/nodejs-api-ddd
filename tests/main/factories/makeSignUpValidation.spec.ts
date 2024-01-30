import { type IValidation } from '@/core/ports/driving/presentation'
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite
} from '@/application/validation'
import { CPFValidation } from '@/application/validation/CPFValidation'
import { EmailValidatorAdapter } from '@/infrastructure/validators/EmailValidatorAdapter'
import { makeSignUpValidation } from '@/main/factories/validations/makeSignUpValidation'

jest.mock('@/application/validation/ValidationComposite')

describe('SignUp IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'cpf', 'email', 'password', 'passwordConfirmation']) { validations.push(new RequiredFieldsValidation(field)) }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    validations.push(new CPFValidation('cpf'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
