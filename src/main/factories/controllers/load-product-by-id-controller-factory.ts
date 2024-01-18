import { makeDbLoadProductById } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { type Controller } from '@/presentation/protocols'
import { LoadProductByidController } from '@/presentation/controllers'

export const makeLoadProductByIdController = (): Controller => {
  const controller = new LoadProductByidController(makeDbLoadProductById())
  return makeLogControllerDecorator(controller)
}
