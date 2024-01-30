import { type IValidation } from '@/core/ports/driving/presentation'
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite
} from '@/validation/validators'
import { CPFValidation } from '@/validation/validators/CPFValidation'
import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter'
import { makeSignUpValidation } from '@/main/factories/validations/makeSignUpValidation'

jest.mock('@/validation/validators/ValidationComposite')

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
