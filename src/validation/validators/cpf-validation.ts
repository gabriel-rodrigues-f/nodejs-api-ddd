import { InvalidParamError } from '@/presentation/errors'
import { type Validation } from '@/presentation/protocols'

export class CpfValidation implements Validation {
  constructor (private readonly field: string) { }
  validate (input: any): Error {
    return new InvalidParamError(this.field)
  }
}
