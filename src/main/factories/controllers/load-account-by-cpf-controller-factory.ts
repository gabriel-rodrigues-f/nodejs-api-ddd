import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadAccountByCpf } from '@/main/factories/usecases'
import { type IController } from '@/presentation/protocols'
import { LoadAccountByCPFController } from '@/presentation/controllers'

export const makeLoadAccountByCpfController = (): IController => {
  const controller = new LoadAccountByCPFController(makeDbLoadAccountByCpf())
  return makeLogControllerDecorator(controller)
}
