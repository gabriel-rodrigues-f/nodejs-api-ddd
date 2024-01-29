import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import { makeLoadAccountByCPFController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.get('/accounts/:cpf', auth, adaptRoute(makeLoadAccountByCPFController()))
}
