import { LoadAccountByCpfController } from './load-account-by-cpf-controller'
import {
  type LoadAccountByCpf,
  type HttpRequest,
  type AccountModel,
  notFound,
  serverError,
  ok
} from './load-account-by-cpf-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    cpf: 'valid_cpf'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  cpf: 'valid_cpf',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeLoadAccountByCpf = (): LoadAccountByCpf => {
  class LoadAccountByCpfStub implements LoadAccountByCpf {
    async loadByCpf (cpf: string): Promise<AccountModel> {
      return await Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByCpfStub()
}

type SutTypes = {
  sut: LoadAccountByCpfController
  loadAccountByCpfStub: LoadAccountByCpf
}

const makeSut = (): SutTypes => {
  const loadAccountByCpfStub = makeLoadAccountByCpf()
  const sut = new LoadAccountByCpfController(loadAccountByCpfStub)
  return {
    sut,
    loadAccountByCpfStub
  }
}

describe('LoadAccountByCpf Controller', () => {
  test('Should call LoadAccountById with correct values', async () => {
    const { sut, loadAccountByCpfStub } = makeSut()
    const loadbyCpfSpy = jest.spyOn(loadAccountByCpfStub, 'loadByCpf')
    await sut.handle(makeFakeRequest())
    expect(loadbyCpfSpy).toHaveBeenCalledWith('valid_cpf')
  })

  test('Should return 204 if LoadAccountByCpf returns empty', async () => {
    const { sut, loadAccountByCpfStub } = makeSut()
    jest.spyOn(loadAccountByCpfStub, 'loadByCpf').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 500 if LoadAccountByCpf throws', async () => {
    const { sut, loadAccountByCpfStub } = makeSut()
    jest.spyOn(loadAccountByCpfStub, 'loadByCpf').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })
})
