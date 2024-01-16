import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddProductController } from '../factories/controllers/product/add-product/add-product-controller-factory'
import { makeLoadProductsController } from '../factories/controllers/product/load-products/load-products-controller-factory'
import { makeLoadProductByIdController } from '../factories/controllers/product/load-product-by-id/load-product-by-id-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/products', adminAuth, adaptRoute(makeAddProductController()))
  router.get('/products', auth, adaptRoute(makeLoadProductsController()))
  router.get('/products/:id', auth, adaptRoute(makeLoadProductByIdController()))
}
