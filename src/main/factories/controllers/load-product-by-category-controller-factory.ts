import { makeDbLoadProductByCategory } from '@/main/factories/usecases/db-load-product-by-category-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log.controller-decorator-factory'
import { type Controller } from '@/presentation/protocols/controller'
import { LoadProductByCategoryController } from '@/presentation/controllers/product/load-product-by-category/load-product-by-category-controller'

export const makeLoadProductByCategoryController = (): Controller => {
  const controller = new LoadProductByCategoryController(makeDbLoadProductByCategory())
  return makeLogControllerDecorator(controller)
}
