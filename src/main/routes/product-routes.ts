import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { auth, adminAuth } from '@/main/middlewares'
import {
  makeAddProductController,
  makeLoadProductsController,
  makeDeleteProductController,
  makeLoadProductByIdController,
  makeLoadProductByCategoryController
} from '@/main/factories/controllers'

export default (router: Router): void => {
  router.get('/products', auth, adaptRoute(makeLoadProductsController()))
  router.get('/products/:id/product', auth, adaptRoute(makeLoadProductByIdController()))
  router.get('/products/:id/category', auth, adaptRoute(makeLoadProductByCategoryController()))
  router.post('/products', adminAuth, adaptRoute(makeAddProductController()))
  router.delete('/products/:id/product', auth, adaptRoute(makeDeleteProductController()))
}
