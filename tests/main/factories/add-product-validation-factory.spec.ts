import { type IValidation } from '@/presentation/protocols'
import { makeAddProductValidation } from '@/main/factories/validations'
import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('Add Product IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeAddProductValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'category', 'price', 'description', 'image']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
