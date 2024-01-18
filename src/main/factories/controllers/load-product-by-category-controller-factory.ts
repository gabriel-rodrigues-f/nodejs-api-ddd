import { makeDbLoadProductByCategory } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { type Controller } from '@/presentation/protocols'
import { LoadProductByCategoryController } from '@/presentation/controllers'

export const makeLoadProductByCategoryController = (): Controller => {
  const controller = new LoadProductByCategoryController(makeDbLoadProductByCategory())
  return makeLogControllerDecorator(controller)
}
