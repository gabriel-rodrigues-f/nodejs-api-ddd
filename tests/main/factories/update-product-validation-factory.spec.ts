import { type Validation } from '@/presentation/protocols'
import { makeUpdateProductValidation } from '@/main/factories/validations'
import {
  MandatoryFieldValidation,
  ValidationComposite
} from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('Update Product Validation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeUpdateProductValidation()
    const validations: Validation[] = []
    const fields = ['name', 'category', 'price', 'description', 'image']
    validations.push(new MandatoryFieldValidation(fields))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
