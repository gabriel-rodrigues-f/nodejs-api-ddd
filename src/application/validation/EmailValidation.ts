import { type IEmailValidator } from '@/core/ports/driving/validators'
import { type IValidation } from '@/core/ports/driving/presentation'
import { InvalidParam } from '@/application/presentation/errors'

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
