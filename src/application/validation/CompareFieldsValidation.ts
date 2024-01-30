import { InvalidParam } from '@/application/presentation/errors'
import { type IValidation } from '@/core/ports/driving/presentation'

export class CompareFieldsValidation implements IValidation {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string
  ) { }

  validate (input: any): Error {
    if (input[this.field] !== input[this.fieldToCompare]) return new InvalidParam(this.fieldToCompare)
  }
}
