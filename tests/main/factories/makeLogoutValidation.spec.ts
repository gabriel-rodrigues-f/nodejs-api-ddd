import { type IValidation } from '@/core/ports/driving/presentation'
import { makeLogoutValidation } from '@/main/factories/validations'
import {
  RequiredFieldsValidation,
  ValidationComposite
} from '@/application/validation'

jest.mock('@/application/validation/ValidationComposite')

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
