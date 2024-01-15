import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddProductController } from '../factories/controllers/product/add-product/add-product-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeLoadProductsController } from '../factories/controllers/product/add-product/load-products/load-products-controller-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware('user'))
  router.post('/products', adminAuth, adaptRoute(makeAddProductController()))
  router.get('/products', auth, adaptRoute(makeLoadProductsController()))
}
