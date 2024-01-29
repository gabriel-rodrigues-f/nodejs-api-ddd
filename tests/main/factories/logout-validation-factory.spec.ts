import { type Validation } from '@/presentation/protocols'
import { makeLogoutValidation } from '@/main/factories/validations'
import {
  RequiredFieldsValidation,
  ValidationComposite
} from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('Logout Validation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeLogoutValidation()
    const validations: Validation[] = []
    for (const field of ['accessToken', 'email']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
