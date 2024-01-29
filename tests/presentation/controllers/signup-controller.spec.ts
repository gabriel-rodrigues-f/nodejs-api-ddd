import { type AccountModel } from '@/domain/models'
import {
  type AddAccountParams,
  type Authentication,
  type AuthenticationParams,
  type IAddAccount
} from '@/domain/ports'
import { SignUpController } from '@/presentation/controllers'
import { type HttpRequest, type Validation } from '@/presentation/protocols'
import { ServerError, MissingParamError, EmailInUseError } from '@/presentation/errors'
import { serverError, ok, badRequest, forbidden } from '@/presentation/helpers'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    cpf: 'valid_cpf',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const mockAccount = (): AccountModel => ({
  id: 'valid_id',
  cpf: 'valid_cpf',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  cpf: 'valid_cpf',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }
  return new AuthenticationStub()
}

const mockAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccount())
    }
  }
  return new AddAccountStub()
}

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: SignUpController
  addAccountStub: IAddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

const mockSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 500 if IAddAccount throws Exception', async () => {
    const { sut, addAccountStub } = mockSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new ServerError('')))
  })

  test('Should return 200 if data is provided', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call IAddAccount with correct values', async () => {
    const { sut, addAccountStub } = mockSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith(mockAddAccountParams())
  })

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

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = mockSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = mockSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValue(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 403 if IAddAccount returns null', async () => {
    const { sut, addAccountStub } = mockSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(forbidden(new EmailInUseError()))
  })
})
