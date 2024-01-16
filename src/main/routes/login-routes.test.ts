import { type AddAccountModel } from '@/domain/usecases/account/add-account'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import { type Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

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

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'valid_name',
          cpf: '12345678909',
          email: 'valid_email@mail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@mail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@mail.com',
          password: 'invalid_password'
        })
        .expect(401)
    })
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
