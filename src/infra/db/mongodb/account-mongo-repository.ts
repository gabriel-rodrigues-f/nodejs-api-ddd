import { MongoHelper } from '.'
import { ObjectId } from 'mongodb'
import { type AccountModel } from '@/domain/models'
import { type AddAccountParams } from '@/domain/ports'
import {
  type DeleteAccessTokenRepository,
  type IAddAccountRepository,
  type LoadAccountByEmailRepository,
  type LoadAccountByTokenRepository,
  type UpdateAccessTokenRepository
} from '@/data/adapters'

export class AccountMongoRepository implements
  IAddAccountRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository,
  DeleteAccessTokenRepository {
  async add (params: AddAccountParams): Promise<AccountModel> {
    const collection = MongoHelper.getCollection('accounts')
    const result = await collection.insertOne(params)
    const id = result.insertedId.toHexString()
    return MongoHelper.map(params, id)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const collection = MongoHelper.getCollection('accounts')
    const account = await collection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const collection = MongoHelper.getCollection('accounts')
    await collection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: { accessToken: token }
    })
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const collection = MongoHelper.getCollection('accounts')
    const account = await collection.findOne({
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
    const collection = MongoHelper.getCollection('accounts')
    return await collection.findOne<AccountModel>({ cpf })
  }

  async deleteAccessToken (email: string): Promise<void> {
    const collection = MongoHelper.getCollection('accounts')
    await collection.updateOne({ email }, { $unset: { accessToken: '' } })
  }
}
