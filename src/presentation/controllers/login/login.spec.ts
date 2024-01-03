import { InvalidParamError, MissingParamError } from "../../errors"
import { badRequest } from "../../helpers/http-helpers"
import { HttpRequest } from "../../protocols"
import { EmailValidator } from "../signup/signup-protocols"
import { LoginController } from "./login"

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  return emailValidatorStub
}

interface SutTypes {
  sut: LoginController,
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new LoginController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const request: HttpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const { sut } = makeSut()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const request: HttpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const { sut } = makeSut()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should call EmailValidator using correct email', async () => {
    const request: HttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(request)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const request: HttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
})