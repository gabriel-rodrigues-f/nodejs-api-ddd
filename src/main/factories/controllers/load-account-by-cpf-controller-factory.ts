import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadAccountByCpf } from '@/main/factories/usecases'
import { type IController } from '@/presentation/protocols'
import { LoadAccountByCpfController } from '@/presentation/controllers'

export const makeLoadAccountByCpfController = (): IController => {
  const controller = new LoadAccountByCpfController(makeDbLoadAccountByCpf())
  return makeLogControllerDecorator(controller)
}
