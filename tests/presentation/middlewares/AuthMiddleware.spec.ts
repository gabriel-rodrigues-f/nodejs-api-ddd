import { type Account } from '@/domain/entities'
import { type ILoadAccountByToken } from '@/domain/ports'
import { type IHTTPRequest } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'
import { AccessDenied } from '@/presentation/errors'
import {
  forbidden,
  ok,
  serverError
} from '@/presentation/helpers'

const mockAccount = (): Account => ({
  id: 'valid_id',
  cpf: 'any_cpf',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const mockRequest = (): IHTTPRequest => ({
  headers: {
    authorization: 'Bearer any_token'
  }
})

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: ILoadAccountByToken
}

const mockLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<Account> {
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
  test('Should return 403 if no Authorization exists in headers', async () => {
    const { sut } = mockSut()
    const request: IHTTPRequest = {
      headers: {}
    }
    const response = await sut.handle(request)
    expect(response).toEqual(forbidden(new AccessDenied()))
  })

  test('Should call ILoadAccountByToken usign correct values', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = mockSut(role)
    const request: IHTTPRequest = mockRequest()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(request)
    expect(loadSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should 403 if ILoadAccountByToken returns null', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = mockSut(role)
    const request: IHTTPRequest = mockRequest()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle(request)
    expect(response).toEqual(forbidden(new AccessDenied()))
  })

  test('Should 200 if ILoadAccountByToken returns an account', async () => {
    const role = 'any_role'
    const { sut } = mockSut(role)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok({ accountId: 'valid_id' }))
  })

  test('Should return 500 if ILoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = mockSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
