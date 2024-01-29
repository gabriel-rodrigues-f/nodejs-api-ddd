import { type Logout } from '@/domain/usecases'
import { type Validation, type HttpRequest } from '@/presentation/protocols'
import { LogoutController } from '@/presentation/controllers'

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
})
