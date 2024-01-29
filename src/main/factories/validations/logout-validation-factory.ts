import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'

export const makeLogoutValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
