import { ObjectId } from 'mongodb'
import {
  type AddAccountRepository,
  type LoadAccountByEmailRepository,
  type UpdateAccessTokenRepository,
  type LoadAccountByTokenRepository,
  type AddAccountModel,
  type AccountModel,
  MongoHelper
} from './account-mongo-repository-protocols'

export class AccountMongoRepository implements
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const id = result.insertedId.toHexString()
    return MongoHelper.map(accountData, id)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: { accessToken: token }
    })
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })
    return account && MongoHelper.map(account)
  }

  async loadByCpf (cpf: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    return await accountCollection.findOne<AccountModel>({ cpf })
  }
}
