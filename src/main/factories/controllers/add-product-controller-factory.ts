import { makeDbAddProduct } from '@/main/factories/usecases/db-add-product-factory'
import { makeAddProductValidation } from '@/main/factories/validations/add-product-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log.controller-decorator-factory'
import { type Controller } from '@/presentation/protocols/controller'
import { AddProductController } from '@/presentation/controllers/product/add-product/add-product-controller'

export const makeAddProductController = (): Controller => {
  const controller = new AddProductController(makeAddProductValidation(), makeDbAddProduct())
  return makeLogControllerDecorator(controller)
}
