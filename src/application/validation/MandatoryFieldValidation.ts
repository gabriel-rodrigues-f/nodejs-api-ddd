import { type IValidation } from '@/core/ports/driving/presentation'
import { MissingField } from '@/application/presentation/errors'

export class MandatoryFieldValidation implements IValidation {
  constructor (private readonly fieldNames: string[]) { }
  validate (input: any): Error {
    const missingFields = this.fieldNames.filter(fieldName => !input[fieldName])
    const fields = String(this.fieldNames.join(', '))
    if (missingFields.length === this.fieldNames.length) return new MissingField(fields)
  }
}
