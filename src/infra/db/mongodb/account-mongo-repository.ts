import { MongoHelper } from '.'
import { ObjectId } from 'mongodb'
import { type AccountModel } from '@/domain/models'
import { type AddAccountParams } from '@/domain/usecases'
import {
  type DeleteAccessTokenRepository,
  type AddAccountRepository,
  type LoadAccountByEmailRepository,
  type LoadAccountByTokenRepository,
  type UpdateAccessTokenRepository
} from '@/data/protocols'

export class AccountMongoRepository implements
  AddAccountRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository,
  DeleteAccessTokenRepository {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
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

  async deleteAccessToken (accessToken: string, email: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      email
    }, {
      $unset: { accessToken: '' }
    })
  }
}
