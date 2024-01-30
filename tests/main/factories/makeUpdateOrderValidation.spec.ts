import { type IValidation } from '@/core/ports/driving/presentation'
import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { makeUpdateOrderValidation } from '@/main/factories/validations'

jest.mock('@/validation/validators/ValidationComposite')

describe('Add Order IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeUpdateOrderValidation()
    const validations: IValidation[] = []
    for (const field of ['status']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
