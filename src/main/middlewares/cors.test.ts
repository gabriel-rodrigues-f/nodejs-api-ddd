import request from 'supertest'
import app from '../config/app'

describe('Cors Middleware', () => {
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