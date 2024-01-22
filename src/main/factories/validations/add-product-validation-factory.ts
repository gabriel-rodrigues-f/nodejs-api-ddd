import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'

export const makeAddProductValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['name', 'category', 'price', 'description', 'image']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
