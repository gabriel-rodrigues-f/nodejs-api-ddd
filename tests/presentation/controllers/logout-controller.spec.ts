import { type Logout } from '@/domain/usecases'
import { type Validation, type HttpRequest } from '@/presentation/protocols'
import { LogoutController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers'

const mockRequest = (): HttpRequest => {
  return {
    body: {
      accessToken: 'any_token',
      id: 'any_id'
    }
  }
}

export type IRequestLogout = {
  accessToken: string
  id: string
}

const mockDeleteAccessToken = (): Logout => {
  class LogoutStub implements Logout {
    async logout ({ accessToken, id }: IRequestLogout): Promise<void> {
      await Promise.resolve()
    }
  }
  return new LogoutStub()
}

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  logoutStub: Logout
  validationStub: Validation
  sut: LogoutController
}

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  const logoutStub = mockDeleteAccessToken()
  const sut = new LogoutController(validationStub, logoutStub)
  return {
    sut,
    validationStub,
    logoutStub
  }
}

describe('Logout Controller', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = mockSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return an Error if Validation returns an Error', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call Logout with correct values', async () => {
    const { sut, logoutStub } = mockSut()
    const logoutSpy = jest.spyOn(logoutStub, 'logout')
    const request = mockRequest()
    await sut.handle(request)
    expect(logoutSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 500 if Logout throws', async () => {
    const { sut, logoutStub } = mockSut()
    jest.spyOn(logoutStub, 'logout').mockReturnValue(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
