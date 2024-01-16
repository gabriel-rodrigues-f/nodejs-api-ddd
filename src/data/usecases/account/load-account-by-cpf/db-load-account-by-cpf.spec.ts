import { DbLoadAccountByCpf } from './db-load-account-by-cpf'
import {
  type LoadAccountByCpfRepository,
  type AccountModel
} from '.'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  cpf: 'valid_cpf',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeLoadAccountByRepositoryStub = (): LoadAccountByCpfRepository => {
  class LoadAccountByCpfRepositoryStub implements LoadAccountByCpfRepository {
    async loadByCpf (cpf: string): Promise<AccountModel> {
      return await Promise.resolve(makeFakeAccount())
    }
  }
  return new LoadAccountByCpfRepositoryStub()
}

type SutTypes = {
  sut: DbLoadAccountByCpf
  loadAccountByCpfRepositoryStub: LoadAccountByCpfRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByCpfRepositoryStub = makeLoadAccountByRepositoryStub()
  const sut = new DbLoadAccountByCpf(loadAccountByCpfRepositoryStub)
  return {
    sut,
    loadAccountByCpfRepositoryStub
  }
}

describe('DbLoadAccountByCpf Usecase', () => {
  test('Should call LoadAccountByCpfRepository with correct values', async () => {
    const { sut, loadAccountByCpfRepositoryStub } = makeSut()
    const loadByCpfStub = jest.spyOn(loadAccountByCpfRepositoryStub, 'loadByCpf')
    await sut.loadByCpf('valid_cpf')
    expect(loadByCpfStub).toHaveBeenCalledWith('valid_cpf')
  })

  test('Should thorws if LoadAccountByCpfRepository throws', async () => {
    const { sut, loadAccountByCpfRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByCpfRepositoryStub, 'loadByCpf').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadByCpf('any_cpf')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const product = await sut.loadByCpf('any_cpf')
    expect(product).toEqual(makeFakeAccount())
  })
})
