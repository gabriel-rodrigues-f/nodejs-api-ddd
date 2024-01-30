import { type ILogout } from '@/core/ports/driving/services'
import { type IValidation, type IHTTPRequest } from '@/core/ports/driving/presentation'
import { LogoutController } from '@/application/presentation/controllers'
import { MissingParam } from '@/application/presentation/errors'
import { badRequest, noContent, serverError } from '@/application/presentation/helpers'

const mockRequest = (): IHTTPRequest => {
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

const mockDeleteAccessToken = (): ILogout => {
  class LogoutStub implements ILogout {
    async logout (token: string): Promise<void> {
      await Promise.resolve()
    }
  }
  return new LogoutStub()
}

const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  logoutStub: ILogout
  validationStub: IValidation
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

describe('ILogout IController', () => {
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

  test('Should call ILogout with correct values', async () => {
    const { sut, logoutStub } = mockSut()
    const logoutSpy = jest.spyOn(logoutStub, 'logout')
    const request = mockRequest()
    const { email } = request.body
    await sut.handle(request)
    expect(logoutSpy).toHaveBeenCalledWith(email)
  })

  test('Should return 500 if ILogout throws', async () => {
    const { sut, logoutStub } = mockSut()
    jest.spyOn(logoutStub, 'logout').mockReturnValue(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
