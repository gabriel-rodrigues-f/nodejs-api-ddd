import { makeDbLoadProductById } from '@/main/factories/usecases/db-load-product-by-id-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log.controller-decorator-factory'
import { type Controller } from '@/presentation/protocols/controller'
import { LoadProductByidController } from '@/presentation/controllers/product/load-product-by-id/load-product-by-id-controller'

export const makeLoadProductByIdController = (): Controller => {
  const controller = new LoadProductByidController(makeDbLoadProductById())
  return makeLogControllerDecorator(controller)
}
