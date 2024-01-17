import { type Controller } from '@/presentation/protocols/controller'
import { LoadProductByCategoryController } from '@/presentation/controllers/product/load-product-by-category/load-product-by-category-controller'
import { makeDbLoadProductByCategory } from '@/main/factories/usecases/db-load-product-by-category-factory'
import { makeLogControllerDecorator } from '../decorators/log.controller-decorator-factory'

export const makeLoadProductByCategoryController = (): Controller => {
  const controller = new LoadProductByCategoryController(makeDbLoadProductByCategory())
  return makeLogControllerDecorator(controller)
}
