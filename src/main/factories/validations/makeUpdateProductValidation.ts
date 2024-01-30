import { type IValidation } from '@/core/ports/driving/presentation'
import {
  MandatoryFieldValidation,
  ValidationComposite
} from '@/validation/validators'

export const makeUpdateProductValidation = (): IValidation => {
  const validations: IValidation[] = []
  const fields = ['name', 'category', 'price', 'description', 'image']
  validations.push(new MandatoryFieldValidation(fields))
  return new ValidationComposite(validations)
}
