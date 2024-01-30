import { type IValidation } from '@/presentation/protocols'
import { makeUpdateProductValidation } from '@/main/factories/validations'
import {
  MandatoryFieldValidation,
  ValidationComposite
} from '@/validation/validators'

jest.mock('@/validation/validators/ValidationComposite')

describe('Update Product IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeUpdateProductValidation()
    const validations: IValidation[] = []
    const fields = ['name', 'category', 'price', 'description', 'image']
    validations.push(new MandatoryFieldValidation(fields))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
