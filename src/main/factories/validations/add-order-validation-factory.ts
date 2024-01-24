import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'

export const makeAddOrderValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['customer', 'products', 'status', 'createdAt', 'updatedAt', 'amount']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
