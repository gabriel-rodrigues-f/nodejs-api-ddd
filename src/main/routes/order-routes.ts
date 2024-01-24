import { type Router } from 'express'
import { auth } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'
import { makeAddOrderController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/orders', auth, adaptRoute(makeAddOrderController()))
}
