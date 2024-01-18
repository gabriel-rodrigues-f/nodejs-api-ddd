import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddProductController } from '@/main/factories/controllers/add-product-controller-factory'
import { makeLoadProductsController } from '@/main/factories/controllers/load-products-controller-factory'
import { makeDeleteProductController } from '@/main/factories/controllers/delete-product-controller-factory'
import { makeLoadProductByIdController } from '@/main/factories/controllers/load-product-by-id-controller-factory'
import { makeLoadProductByCategoryController } from '@/main/factories/controllers/load-product-by-category-controller-factory'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.get('/products', auth, adaptRoute(makeLoadProductsController()))
  router.get('/products/:id/product', auth, adaptRoute(makeLoadProductByIdController()))
  router.get('/products/:id/category', auth, adaptRoute(makeLoadProductByCategoryController()))
  router.post('/products', adminAuth, adaptRoute(makeAddProductController()))
  router.delete('/products/:id/product', auth, adaptRoute(makeDeleteProductController()))
}
