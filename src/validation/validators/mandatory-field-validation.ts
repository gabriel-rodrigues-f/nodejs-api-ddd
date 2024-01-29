import { type IValidation } from '@/presentation/protocols'
import { MissingField } from '@/presentation/errors'

export class MandatoryFieldValidation implements IValidation {
  constructor (private readonly fieldNames: string[]) { }
  validate (input: any): Error {
    const missingFields = this.fieldNames.filter(fieldName => !input[fieldName])
    const fields = String(this.fieldNames.join(', '))
    if (missingFields.length === this.fieldNames.length) return new MissingField(fields)
  }
}
