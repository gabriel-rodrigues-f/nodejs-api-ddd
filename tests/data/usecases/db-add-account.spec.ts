import { DbAddAccount } from '@/data/ports'
import { type AddAccountParams } from '@/domain/ports'
import { type Account } from '@/domain/entities'
import {
  type IHasher,
  type IAddAccountRepository,
  type ILoadAccountByEmailRepository
} from '@/data/adapters'

const mockHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

const mockAccount = (): Account => ({
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

const mockAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (params: AddAccountParams): Promise<Account> {
      return await Promise.resolve(mockAccount())
    }
  }
  return new AddAccountRepositoryStub()
}

const mockLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<Account> {
      return await Promise.resolve(null)
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount
  hasherStub: IHasher
  addAccountRepositoryStub: IAddAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
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
  test('Shoud call IHasher with correct password', async () => {
    const { sut, hasherStub } = mockSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAccountData())
    expect(hasherSpy).toHaveBeenCalledWith('hashed_password')
  })

  test('Shoud throw Error if IHasher Throw Error', async () => {
    const { sut, hasherStub } = mockSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Shoud call IAddAccountRepository with correct values', async () => {
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

  test('Shoud throw Error if IHasher Throw Error', async () => {
    const { sut, addAccountRepositoryStub } = mockSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call ILoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = mockSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAccountData())
    expect(loadByEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
