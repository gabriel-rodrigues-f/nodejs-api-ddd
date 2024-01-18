import { LoadAccountByCpfController } from './load-account-by-cpf-controller'
import {
  type LoadAccountByCpf,
  type HttpRequest,
  type AccountModel,
  notFound,
  serverError,
  ok
} from '.'

const mockRequest = (): HttpRequest => ({
  params: {
    cpf: 'valid_cpf'
  }
})

const mockAccount = (): AccountModel => ({
  id: 'valid_id',
  cpf: 'valid_cpf',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const mockLoadAccountByCpf = (): LoadAccountByCpf => {
  class LoadAccountByCpfStub implements LoadAccountByCpf {
    async loadByCpf (cpf: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccount())
    }
  }
  return new LoadAccountByCpfStub()
}

type SutTypes = {
  sut: LoadAccountByCpfController
  loadAccountByCpfStub: LoadAccountByCpf
}

const mockSut = (): SutTypes => {
  const loadAccountByCpfStub = mockLoadAccountByCpf()
  const sut = new LoadAccountByCpfController(loadAccountByCpfStub)
  return {
    sut,
    loadAccountByCpfStub
  }
}

describe('LoadAccountByCpf Controller', () => {
  test('Should call LoadAccountById with correct values', async () => {
    const { sut, loadAccountByCpfStub } = mockSut()
    const loadbyCpfSpy = jest.spyOn(loadAccountByCpfStub, 'loadByCpf')
    await sut.handle(mockRequest())
    expect(loadbyCpfSpy).toHaveBeenCalledWith('valid_cpf')
  })

  test('Should return 404 if LoadAccountByCpf returns empty', async () => {
    const { sut, loadAccountByCpfStub } = mockSut()
    jest.spyOn(loadAccountByCpfStub, 'loadByCpf').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 500 if LoadAccountByCpf throws', async () => {
    const { sut, loadAccountByCpfStub } = mockSut()
    jest.spyOn(loadAccountByCpfStub, 'loadByCpf').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockAccount()))
  })
})
