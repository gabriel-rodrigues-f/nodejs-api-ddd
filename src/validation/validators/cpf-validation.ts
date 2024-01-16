import { InvalidParamError } from '@/presentation/errors'
import { type Validation } from '@/presentation/protocols'

export class CpfValidation implements Validation {
  private readonly errors: string[] = []
  constructor (private readonly field: string) { }
  validate (input: any): Error {
    if (typeof input !== 'string') {
      this.errors.push('Invalid input type')
    } else {
      input = input.replace(/[\s.-]*/g, '')

      if (
        !input ||
        input.length !== 11 ||
        /^(.)\1*$/.test(input) ||
        [
          '00000000000',
          '11111111111',
          '22222222222',
          '33333333333',
          '44444444444',
          '55555555555',
          '66666666666',
          '77777777777',
          '88888888888',
          '99999999999'
        ].includes(input)
      ) {
        this.errors.push('Invalid CPF format')
      }

      let sum = 0
      let rest: number

      for (let i = 1; i <= 9; i++) { sum += parseInt(input.substring(i - 1, i), 10) * (11 - i) }

      rest = (sum * 10) % 11
      if (rest === 10 || rest === 11) rest = 0
      if (rest !== parseInt(input.substring(9, 10), 10)) this.errors.push('Invalid CPF')

      sum = 0
      for (let i = 1; i <= 10; i++) { sum += parseInt(input.substring(i - 1, i), 10) * (12 - i) }

      rest = (sum * 10) % 11
      if (rest === 10 || rest === 11) rest = 0
      if (rest !== parseInt(input.substring(10, 11), 10)) this.errors.push('Invalid CPF')
    }

    if (this.errors.length > 0) return new InvalidParamError(this.field)
  }
}
