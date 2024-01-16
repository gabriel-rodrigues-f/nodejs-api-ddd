import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadAccountByCpfController } from '../factories/controllers/load-account-by-cpf-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.get('/accounts/:cpf', auth, adaptRoute(makeLoadAccountByCpfController()))
}
