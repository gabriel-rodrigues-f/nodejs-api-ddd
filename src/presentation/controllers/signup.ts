import { badRequest, serverError } from '../helpers/http-helpers'
import { MissingParamError, InvalidParamError } from '../errors'
import { EmailValidator, Controller, HttpResponse, HttpRequest } from '../protocols'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) { }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
        const isValid = this.emailValidator.isValid(httpRequest.body.email)
        if (!isValid) {
          return badRequest(new InvalidParamError('email'))
        }
      }
      return {
        statusCode: 200,
        body: 'success'
      }
    } catch (error) {
      return serverError()
    }
  }
}
