import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { type IValidation } from '@/core/ports/driving/presentation'

export const makeUpdateOrderValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['status']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
