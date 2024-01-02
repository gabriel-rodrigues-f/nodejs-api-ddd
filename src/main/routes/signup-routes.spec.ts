import request from 'supertest'
import app from '../config/app'

describe('SignUp Route', () => {
  it('Should return an account on success ', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'valid_name',
        email: 'valid_email',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})