import { type IValidation } from '@/core/ports/driving/presentation'
import { MissingParam } from '@/application/presentation/errors'

export class RequiredFieldsValidation implements IValidation {
  constructor (private readonly fieldName: string) { }
  validate (input: any): Error {
    if (!input[this.fieldName]) return new MissingParam(this.fieldName)
  }
}
