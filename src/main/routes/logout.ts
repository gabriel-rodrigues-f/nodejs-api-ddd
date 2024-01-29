import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeLogoutController } from '../factories/controllers/logout-controller-factory'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/logout', auth, adaptRoute(makeLogoutController()))
}
