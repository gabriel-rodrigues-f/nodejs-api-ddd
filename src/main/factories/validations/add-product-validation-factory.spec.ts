import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'
import { makeAddProductValidation } from './add-product-validation-factory'

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
