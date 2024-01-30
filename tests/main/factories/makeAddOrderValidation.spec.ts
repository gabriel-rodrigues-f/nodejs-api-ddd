import { type IValidation } from '@/core/ports/driving/presentation'
import { RequiredFieldsValidation, ValidationComposite } from '@/application/validation'
import { makeAddOrderValidation } from '@/main/factories/validations'

jest.mock('@/application/validation/ValidationComposite')

describe('Add Order IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeAddOrderValidation()
    const validations: IValidation[] = []
    for (const field of ['customer', 'products', 'status', 'createdAt', 'updatedAt', 'amount']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
