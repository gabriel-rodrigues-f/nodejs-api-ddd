import { type IEmailValidator } from '@/validation/protocols'
import { type IValidation } from '@/presentation/protocols'
import { InvalidParam } from '@/presentation/errors'

export class EmailValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: IEmailValidator
  ) { }

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) return new InvalidParam(this.fieldName)
  }
}
