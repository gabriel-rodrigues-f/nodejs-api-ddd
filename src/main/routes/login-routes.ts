import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login/login-controller-factory'
import { makeLoadAccountByCpfController } from '../factories/controllers/account/load-account-by-cpf-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.get('/accounts/:cpf', auth, adaptRoute(makeLoadAccountByCpfController()))
}
