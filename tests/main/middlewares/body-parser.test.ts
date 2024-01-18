import request from 'supertest'
import { type Express } from 'express'
import { setupApp } from '@/main/config/app'

let app: Express

describe('Body Parser Middleware', () => {
  beforeAll(() => {
    app = setupApp()
  })

  const route = '/test_body_parser'
  test('Should parse body as JSON ', async () => {
    app.post(route, (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post(route)
      .send({ name: 'valid_name' })
      .expect({ name: 'valid_name' })
  })
})
