import { RequiredFieldsValidation, ValidationComposite } from '@/validation/validators'
import { type IValidation } from '@/presentation/protocols'

export const makeAddProductValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['name', 'category', 'price', 'description', 'image']) {
    validations.push(new RequiredFieldsValidation(field))
  }
  return new ValidationComposite(validations)
}
