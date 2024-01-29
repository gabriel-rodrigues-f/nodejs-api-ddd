import { MongoDBHelper } from '.'
import { ObjectId } from 'mongodb'
import { type Account } from '@/domain/entities'
import { type AddAccountParams } from '@/domain/ports'
import {
  type IDeleteAccessTokenRepository,
  type IAddAccountRepository,
  type ILoadAccountByEmailRepository,
  type ILoadAccountByTokenRepository,
  type IUpdateAccessTokenRepository
} from '@/data/adapters'

export class AccountMongoRepository implements
  IAddAccountRepository,
  ILoadAccountByEmailRepository,
  ILoadAccountByTokenRepository,
  IUpdateAccessTokenRepository,
  IDeleteAccessTokenRepository {
  async add (params: AddAccountParams): Promise<Account> {
    const collection = MongoDBHelper.getCollection('accounts')
    const result = await collection.insertOne(params)
    const id = result.insertedId.toHexString()
    return MongoDBHelper.map(params, id)
  }

  async loadByEmail (email: string): Promise<Account> {
    const collection = MongoDBHelper.getCollection('accounts')
    const account = await collection.findOne({ email })
    return account && MongoDBHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const collection = MongoDBHelper.getCollection('accounts')
    await collection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: { accessToken: token }
    })
  }

  async loadByToken (token: string, role?: string): Promise<Account> {
    const collection = MongoDBHelper.getCollection('accounts')
    const account = await collection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })
    return account && MongoDBHelper.map(account)
  }

  async loadByCpf (cpf: string): Promise<Account> {
    const collection = MongoDBHelper.getCollection('accounts')
    return await collection.findOne<Account>({ cpf })
  }

  async deleteAccessToken (email: string): Promise<void> {
    const collection = MongoDBHelper.getCollection('accounts')
    await collection.updateOne({ email }, { $unset: { accessToken: '' } })
  }
}
