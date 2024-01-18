import { makeLogControllerDecorator } from '@/main/factories/decorators/log.controller-decorator-factory'
import { makeDbLoadProducts } from '@/main/factories/usecases/db-load-products-factory'
import { type Controller } from '@/presentation/protocols/controller'
import { LoadProductsController } from '@/presentation/controllers/product/load-products/load-products-controller'

export const makeLoadProductsController = (): Controller => {
  const controller = new LoadProductsController(makeDbLoadProducts())
  return makeLogControllerDecorator(controller)
}
