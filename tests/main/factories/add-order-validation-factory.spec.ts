import { type Validation } from '@/presentation/protocols'
import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { makeAddOrderValidation } from '@/main/factories/validations'

jest.mock('@/validation/validators/validation-composite')

describe('Add Order Validation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeAddOrderValidation()
    const validations: Validation[] = []
    for (const field of ['customer', 'products', 'status', 'createdAt', 'updatedAt', 'amount']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
