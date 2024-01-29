import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { type IValidation } from '@/presentation/protocols'

export const makeAddOrderValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['customer', 'products', 'status', 'createdAt', 'updatedAt', 'amount']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
