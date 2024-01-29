import { type Collection } from 'mongodb'
import { type AddAccountParams } from '@/domain/ports'
import {
  MongoHelper,
  AccountMongoRepository
} from '@/infra/db'

let accountCollection: Collection
const MONGO_URL = process.env.MONGO_URL || ''

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const mockAddAccountParams = (): AddAccountParams => ({
    name: 'any_name',
    cpf: 'any_cpf',
    email: 'any_email@mail.com',
    password: 'any_password'
  })

  const mockSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = mockSut()
      const account = await sut.add(mockAddAccountParams())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.cpf).toBe('any_cpf')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = mockSut()
      await accountCollection.insertOne(mockAddAccountParams())
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.cpf).toBe('any_cpf')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = mockSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should udpate the account accessToken on updateAccessToken success', async () => {
      const sut = mockSut()
      const result = await accountCollection.insertOne(mockAddAccountParams())
      const fakeId = result.insertedId.toHexString()
      const account = await accountCollection.findOne({ _id: result.insertedId })
      if (account) expect(account.accessToken).toBeFalsy()
      await sut.updateAccessToken(fakeId, 'any_token')
      const accountWithAccessToken = await accountCollection.findOne({ _id: result.insertedId })
      if (accountWithAccessToken) {
        expect(accountWithAccessToken).toBeTruthy()
        expect(accountWithAccessToken.accessToken).toBe('any_token')
      }
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken without role', async () => {
      const sut = mockSut()
      await accountCollection.insertOne({
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.cpf).toBe('any_cpf')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = mockSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return an account on loadByToken with invalid role', async () => {
      const sut = mockSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'invalid_role'
      })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeFalsy()
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = mockSut()
      const account = await sut.loadByEmail('any_token')
      expect(account).toBeFalsy()
    })

    test('Should return an account on loadByToken if user is admin', async () => {
      const sut = mockSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByCpf', () => {
    test('Should load an account on success', async () => {
      await accountCollection.insertOne(mockAddAccountParams())
      const sut = mockSut()
      const account = await sut.loadByCpf('any_cpf')
      expect(account).toBeTruthy()
    })
  })

  describe('deleteAccessToken()', () => {
    test('Should delete accessToken', async () => {
      const sut = mockSut()
      const result = await accountCollection.insertOne({ ...mockAddAccountParams(), accessToken: 'any_token' })
      const account = await accountCollection.findOne({ _id: result.insertedId })
      if (account) expect(account.accessToken).toBeTruthy()
      await sut.deleteAccessToken('any_email@mail.com')
      const accountWithoutAccessToken = await accountCollection.findOne({ _id: result.insertedId })
      if (accountWithoutAccessToken) expect(accountWithoutAccessToken.accessToken).toBeFalsy()
    })
  })
})
