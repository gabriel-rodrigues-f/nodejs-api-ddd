import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'

export const makeUpdateOrderValidation = (): Validation => {
  const validations: Validation[] = []
  for (const field of ['status']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
