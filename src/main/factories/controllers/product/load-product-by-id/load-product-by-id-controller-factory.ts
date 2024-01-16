import { type Controller } from '@/presentation/protocols/controller'
import { LoadProductByidController } from '@/presentation/controllers/product/load-product-by-id/load-product-by-id-controller'
import { makeDbLoadProductById } from '@/main/factories/usecases/product/load-product-by-id/db-load-product-by-id-factory'
import { makeLogControllerDecorator } from '../../../decorators/log.controller-decorator-factory'

export const makeLoadProductByIdController = (): Controller => {
  const controller = new LoadProductByidController(makeDbLoadProductById())
  return makeLogControllerDecorator(controller)
}
