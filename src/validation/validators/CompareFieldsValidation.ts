import { InvalidParam } from '@/presentation/errors'
import { type IValidation } from '@/presentation/protocols'

export class CompareFieldsValidation implements IValidation {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string
  ) { }

  validate (input: any): Error {
    if (input[this.field] !== input[this.fieldToCompare]) return new InvalidParam(this.fieldToCompare)
  }
}
