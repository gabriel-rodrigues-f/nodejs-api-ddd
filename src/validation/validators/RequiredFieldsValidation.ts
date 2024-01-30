import { type IValidation } from '@/presentation/protocols'
import { MissingParam } from '@/presentation/errors'

export class RequiredFieldsValidation implements IValidation {
  constructor (private readonly fieldName: string) { }
  validate (input: any): Error {
    if (!input[this.fieldName]) return new MissingParam(this.fieldName)
  }
}
