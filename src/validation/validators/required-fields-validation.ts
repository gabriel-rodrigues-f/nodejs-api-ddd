import { MissingParamError } from '@/presentation/errors'
import { type Validation } from '@/presentation/protocols'

export class RequiredFieldsValidation implements Validation {
  constructor (private readonly fieldName: string) { }
  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
