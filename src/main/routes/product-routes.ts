import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddProductController } from '../factories/controllers/product/add-product/add-product-controller-factory'

export default (router: Router): void => {
  router.post('/products', adaptRoute(makeAddProductController()))
}
