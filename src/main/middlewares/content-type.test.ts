import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  it('Should return default conten-type as JSON ', async () => {
    const route = '/test_content_type'
    app.get(route, (req, res) => {
      res.send()
    })
    await request(app)
      .get(route)
      .expect('content-type', /json/)
  })
})