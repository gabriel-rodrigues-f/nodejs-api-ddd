import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { auth, adminAuth } from '@/main/middlewares'
import {
  makeAddProductController,
  makeLoadProductsController,
  makeDeleteProductController,
  makeLoadProductByIdController,
  makeUpdateProductController
} from '@/main/factories/controllers'

export default (router: Router): void => {
  router.get('/products', auth, adaptRoute(makeLoadProductsController()))
  router.get('/products/:id', auth, adaptRoute(makeLoadProductByIdController()))
  router.post('/products', adminAuth, adaptRoute(makeAddProductController()))
  router.delete('/products/:id', adminAuth, adaptRoute(makeDeleteProductController()))
  router.patch('/products/:id', adminAuth, adaptRoute(makeUpdateProductController()))
}
