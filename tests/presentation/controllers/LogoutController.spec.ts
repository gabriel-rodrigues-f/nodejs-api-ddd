import { type Logout } from '@/domain/ports'
import { type IValidation, type IHTTPRequest } from '@/presentation/protocols'
import { LogoutController } from '@/presentation/controllers'
import { MissingParam } from '@/presentation/errors'
import { badRequest, noContent, serverError } from '@/presentation/helpers'

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

const mockDeleteAccessToken = (): Logout => {
  class LogoutStub implements Logout {
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
  logoutStub: Logout
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

describe('Logout IController', () => {
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

  test('Should call Logout with correct values', async () => {
    const { sut, logoutStub } = mockSut()
    const logoutSpy = jest.spyOn(logoutStub, 'logout')
    const request = mockRequest()
    const { email } = request.body
    await sut.handle(request)
    expect(logoutSpy).toHaveBeenCalledWith(email)
  })

  test('Should return 500 if Logout throws', async () => {
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
