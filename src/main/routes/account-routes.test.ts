import { type Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import request from 'supertest'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { type AddAccountModel } from '@/domain/usecases/account/add-account'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

let accountCollection: Collection
const MONGO_URL = process.env.MONGO_URL || ''

const makeFakeAddAccount = (): AddAccountModel => ({
  cpf: '12345678909',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

describe('Login Routes', () => {
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

  describe('GET /account/:cpf', () => {
    test('Should return 403 on account if no accessToken is provided', async () => {
      await request(app)
        .get('/api/accounts/cpf')
        .expect(403)
    })

    test('Should return 200 on load account with accessToken', async () => {
      const reponse = await accountCollection.insertOne({
        name: 'Gabriel',
        email: 'gabriel.rodrigues@gmail.com',
        cpf: '12345678909',
        password: 123,
        role: 'admin'
      })
      const id = reponse.insertedId
      const accessToken = sign({ id }, env.JWT_SECRET)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      await accountCollection.insertOne(makeFakeAddAccount())
      await request(app)
        .get('/api/accounts/12345678909')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
