import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddProductController } from '../factories/controllers/add-product-controller-factory'
import { makeLoadProductsController } from '../factories/controllers/load-products-controller-factory'
import { makeDeleteProductController } from '../factories/controllers/delete-product-controller-factory'
import { makeLoadProductByIdController } from '../factories/controllers/load-product-by-id-controller-factory'
import { makeLoadProductByCategoryController } from '../factories/controllers/load-product-by-category-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.get('/products', auth, adaptRoute(makeLoadProductsController()))
  router.get('/products/:id/product', auth, adaptRoute(makeLoadProductByIdController()))
  router.get('/products/:id/category', auth, adaptRoute(makeLoadProductByCategoryController()))
  router.post('/products', adminAuth, adaptRoute(makeAddProductController()))
  router.delete('/products/:id/product', auth, adaptRoute(makeDeleteProductController()))
}
