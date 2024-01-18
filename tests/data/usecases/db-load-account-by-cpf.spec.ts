import { DbLoadAccountByCpf } from '@/data/usecases'
import { type AccountModel } from '@/domain/models'
import { type LoadAccountByCpfRepository } from '@/data/protocols'

const mockAccount = (): AccountModel => ({
  id: 'valid_id',
  cpf: 'valid_cpf',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const mockLoadAccountByRepositoryStub = (): LoadAccountByCpfRepository => {
  class LoadAccountByCpfRepositoryStub implements LoadAccountByCpfRepository {
    async loadByCpf (cpf: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccount())
    }
  }
  return new LoadAccountByCpfRepositoryStub()
}

type SutTypes = {
  sut: DbLoadAccountByCpf
  loadAccountByCpfRepositoryStub: LoadAccountByCpfRepository
}

const mockSut = (): SutTypes => {
  const loadAccountByCpfRepositoryStub = mockLoadAccountByRepositoryStub()
  const sut = new DbLoadAccountByCpf(loadAccountByCpfRepositoryStub)
  return {
    sut,
    loadAccountByCpfRepositoryStub
  }
}

describe('DbLoadAccountByCpf Usecase', () => {
  test('Should call LoadAccountByCpfRepository with correct values', async () => {
    const { sut, loadAccountByCpfRepositoryStub } = mockSut()
    const loadByCpfStub = jest.spyOn(loadAccountByCpfRepositoryStub, 'loadByCpf')
    await sut.loadByCpf('valid_cpf')
    expect(loadByCpfStub).toHaveBeenCalledWith('valid_cpf')
  })

  test('Should thorws if LoadAccountByCpfRepository throws', async () => {
    const { sut, loadAccountByCpfRepositoryStub } = mockSut()
    jest.spyOn(loadAccountByCpfRepositoryStub, 'loadByCpf').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadByCpf('any_cpf')
    await expect(promise).rejects.toThrow()
  })

  test('Should return account on success', async () => {
    const { sut } = mockSut()
    const account = await sut.loadByCpf('any_cpf')
    expect(account).toEqual(mockAccount())
  })
})
