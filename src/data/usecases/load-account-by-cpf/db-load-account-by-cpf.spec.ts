import { type LoadAccountByCpfRepository } from '@/data/protocols/db/account/load-account-by-cpf-repository'
import { type AccountModel } from '../authentication/db-authentication-protocols'
import { DbLoadAccountByCpf } from './db-load-account-by-cpf'

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
})
