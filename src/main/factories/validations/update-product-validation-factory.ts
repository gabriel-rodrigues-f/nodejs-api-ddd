import { type Validation } from '@/presentation/protocols'
import {
  MandatoryFieldValidation,
  ValidationComposite
} from '@/validation/validators'

export const makeUpdateProductValidation = (): Validation => {
  const validations: Validation[] = []
  const fields = ['name', 'category', 'price', 'description', 'image']
  validations.push(new MandatoryFieldValidation(fields))
  return new ValidationComposite(validations)
}
