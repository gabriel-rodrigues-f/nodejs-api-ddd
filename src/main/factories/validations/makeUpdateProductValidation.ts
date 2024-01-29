import { type IValidation } from '@/presentation/protocols'
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
