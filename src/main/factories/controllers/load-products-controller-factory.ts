import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadProducts } from '@/main/factories/usecases'
import { type Controller } from '@/presentation/protocols'
import { LoadProductsController } from '@/presentation/controllers'

export const makeLoadProductsController = (): Controller => {
  const controller = new LoadProductsController(makeDbLoadProducts())
  return makeLogControllerDecorator(controller)
}
