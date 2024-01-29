import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { type IValidation } from '@/presentation/protocols'

export const makeUpdateOrderValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['status']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
