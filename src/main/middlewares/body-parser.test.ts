import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
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
