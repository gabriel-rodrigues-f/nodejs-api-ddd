import { type Controller } from '@/presentation/protocols/controller'
import { DeleteProductController } from '@/presentation/controllers/product/delete-product/delete-product-controller'
import { makeDbDeleteProduct } from '../usecases/db-delete-product-factory'
import { makeLogControllerDecorator } from '../decorators/log.controller-decorator-factory'

export const makeDeleteProductController = (): Controller => {
  const controller = new DeleteProductController(makeDbDeleteProduct())
  return makeLogControllerDecorator(controller)
}
