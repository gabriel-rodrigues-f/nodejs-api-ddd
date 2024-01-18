import request from 'supertest'
import { type Express } from 'express'
import { setupApp } from '@/main/config/app'

let app: Express

describe('Cors Middleware', () => {
  beforeAll(() => {
    app = setupApp()
  })
  test('Should enable CORS ', async () => {
    const route = '/test_cors'
    app.post(route, (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .get(route)
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
