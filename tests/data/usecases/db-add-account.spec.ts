import { DbAddAccount } from '@/data/usecases'
import { type AddAccountParams } from '@/domain/usecases'
import { type AccountModel } from '@/domain/models'
import {
  type Hasher,
  type AddAccountRepository,
  type LoadAccountByEmailRepository
} from '@/data/protocols'

const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

const mockAccount = (): AccountModel => ({
  id: 'valid_id',
  cpf: 'valid_cpf',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const mockAccountData = (): AddAccountParams => ({
  name: 'valid_name',
  cpf: 'valid_cpf',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccount())
    }
  }
  return new AddAccountRepositoryStub()
}

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return await Promise.resolve(null)
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const mockSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Shoud call Hasher using correct password', async () => {
    const { sut, hasherStub } = mockSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAccountData())
    expect(hasherSpy).toHaveBeenCalledWith('hashed_password')
  })

  test('Shoud throw Error if Hasher Throw Error', async () => {
    const { sut, hasherStub } = mockSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Shoud call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = mockSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      cpf: 'valid_cpf',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Shoud return an Account on success', async () => {
    const { sut } = mockSut()
    const account = await sut.add(mockAccountData())
    expect(account).toEqual(mockAccount())
  })

  test('Shoud throw Error if Hasher Throw Error', async () => {
    const { sut, addAccountRepositoryStub } = mockSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = mockSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAccountData())
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
