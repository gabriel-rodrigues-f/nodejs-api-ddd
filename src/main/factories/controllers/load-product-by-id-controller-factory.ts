import { makeDbLoadProductById } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { type IController } from '@/presentation/protocols'
import { LoadProductByidController } from '@/presentation/controllers'

export const makeLoadProductByIdController = (): IController => {
  const controller = new LoadProductByidController(makeDbLoadProductById())
  return makeLogControllerDecorator(controller)
}
