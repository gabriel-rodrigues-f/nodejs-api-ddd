import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'

let accountCollection: Collection
describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeAddAccountModel = (): AddAccountModel => ({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add(makeAddAccountModel())
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne(makeAddAccountModel())
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('Should udpate the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()
    const result = await accountCollection.insertOne(makeAddAccountModel())
    const fake_id = result.insertedId.toHexString()
    const account = await accountCollection.findOne({ _id: result.insertedId })
    expect(account.accessToken).toBeFalsy()
    await sut.updateAccessToken(fake_id, 'any_token')
    const accountWithAccessToken = await accountCollection.findOne({ _id: result.insertedId })
    expect(accountWithAccessToken).toBeTruthy()
    expect(accountWithAccessToken.accessToken).toBe('any_token')
  })
})
