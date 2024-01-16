import { type Controller } from '@/presentation/protocols/controller'
import { LoadProductsController } from '@/presentation/controllers/product/load-products/load-products-controller'
import { makeLogControllerDecorator } from '../decorators/log.controller-decorator-factory'
import { makeDbLoadProducts } from '../usecases/product/load-products/db-load-products-factory'

export const makeLoadProductsController = (): Controller => {
  const controller = new LoadProductsController(makeDbLoadProducts())
  return makeLogControllerDecorator(controller)
}
