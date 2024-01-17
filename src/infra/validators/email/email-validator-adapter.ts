import validator from 'validator'
import {
  type EmailValidator
} from '.'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
