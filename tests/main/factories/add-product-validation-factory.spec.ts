import { type Validation } from '@/presentation/protocols'
import { makeAddProductValidation } from '@/main/factories/validations'
import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('Add Product Validation Factory', () => {
  test('Should call validation using all validations ', () => {
    makeAddProductValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'category', 'price']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
