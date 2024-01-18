import { makeDbDeleteProduct } from '@/main/factories/usecases/db-delete-product-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log.controller-decorator-factory'
import { type Controller } from '@/presentation/protocols/controller'
import { DeleteProductController } from '@/presentation/controllers/product/delete-product/delete-product-controller'

export const makeDeleteProductController = (): Controller => {
  const controller = new DeleteProductController(makeDbDeleteProduct())
  return makeLogControllerDecorator(controller)
}
