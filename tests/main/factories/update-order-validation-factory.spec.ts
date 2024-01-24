import { type Validation } from '@/presentation/protocols'
import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { makeUpdateOrderValidation } from '@/main/factories/validations'

jest.mock('@/validation/validators/validation-composite')

describe('Add Order Validation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeUpdateOrderValidation()
    const validations: Validation[] = []
    for (const field of ['status']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
