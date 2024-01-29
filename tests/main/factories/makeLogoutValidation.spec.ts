import { type IValidation } from '@/presentation/protocols'
import { makeLogoutValidation } from '@/main/factories/validations'
import {
  RequiredFieldsValidation,
  ValidationComposite
} from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('Logout IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeLogoutValidation()
    const validations: IValidation[] = []
    for (const field of ['email']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
