import { Controller } from '@/presentation/protocols/controller'
import { AddProductController } from '@/presentation/controllers/product/add-product/add-product-controller'
import { makeAddProductValidation } from './add-product-validation-factory'
import { makeLogControllerDecorator } from '../../../decorators/log.controller-decorator-factory'
import { makeDbAddProduct } from '../../../usecases/product/add-product/db-add-product-factory'

export const makeAddProductController = (): Controller => {
  const controller = new AddProductController(makeAddProductValidation(), makeDbAddProduct())
  return makeLogControllerDecorator(controller)
}
