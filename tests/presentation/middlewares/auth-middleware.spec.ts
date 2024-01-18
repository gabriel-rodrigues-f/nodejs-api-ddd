import { type AccountModel } from '@/domain/models'
import { type LoadAccountByToken } from '@/domain/usecases'
import { type HttpRequest } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'
import { AccessDeniedError } from '@/presentation/errors'
import {
  forbidden,
  ok,
  serverError
} from '@/presentation/helpers'

const mockAccount = (): AccountModel => ({
  id: 'valid_id',
  cpf: 'any_cpf',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const mockRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccount())
    }
  }
  const loadAccountByTokenStub = new LoadAccountByTokenStub()
  return loadAccountByTokenStub
}

const mockSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = mockSut()
    const request: HttpRequest = {
      headers: {}
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken usign correct values', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = mockSut(role)
    const request: HttpRequest = mockRequest()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(request)
    expect(loadSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should 403 if LoadAccountByToken returns null', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = mockSut(role)
    const request: HttpRequest = mockRequest()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should 200 if LoadAccountByToken returns an account', async () => {
    const role = 'any_role'
    const { sut } = mockSut(role)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = mockSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
