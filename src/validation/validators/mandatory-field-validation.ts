import { type Validation } from '@/presentation/protocols'
import { MissingFieldError } from '@/presentation/errors'

export class MandatoryFieldValidation implements Validation {
  constructor (private readonly fieldNames: string[]) { }
  validate (input: any): Error {
    const missingFields = this.fieldNames.filter(fieldName => !input[fieldName])
    if (missingFields.length === this.fieldNames.length) return new MissingFieldError(this.fieldNames.join(', '))
  }
}
