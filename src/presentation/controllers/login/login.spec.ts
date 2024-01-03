import { MissingParamError } from "../../errors"
import { badRequest } from "../../helpers/http-helpers"
import { HttpRequest } from "../../protocols"
import { LoginController } from "./login"

const makeSut = (): LoginController => {
  return new LoginController()
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const request: HttpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const sut = makeSut()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const request: HttpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const sut = makeSut()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})