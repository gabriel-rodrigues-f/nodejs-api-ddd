import { MissingParamError } from "../../errors"
import { badRequest } from "../../helpers/http-helpers"
import { HttpRequest } from "../../protocols"
import { LoginController } from "./login"

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const request: HttpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const sut = new LoginController()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})