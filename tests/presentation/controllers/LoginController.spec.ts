import {
  type IAuthentication, type AuthenticationParams
} from '@/domain/ports'
import {
  type IHTTPRequest, type IValidation
} from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers'
import { MissingParam } from '@/presentation/errors'
import {
  unauthorized,
  serverError,
  ok,
  badRequest
} from '@/presentation/helpers'

const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }
  return new AuthenticationStub()
}

const mockRequest = (): IHTTPRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: LoginController
  authenticationStub: IAuthentication
  validationStub: IValidation
}

const mockSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const validationStub = mockValidation()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('Login IController', () => {
  test('Should call IAuthentication with correct values', async () => {
    const { sut, authenticationStub } = mockSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = mockSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(''))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(unauthorized())
  })

  test('Should return 500 if IAuthentication throws', async () => {
    const { sut, authenticationStub } = mockSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValue(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok({ access_token: 'any_token' }))
  })

  test('Should call IValidation with correct value', async () => {
    const { sut, validationStub } = mockSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return an Error if IValidation returns an Error', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParam('any_field'))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParam('any_field')))
  })
})
