import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadAccountByCpf } from '@/main/factories/usecases'
import { type Controller } from '@/presentation/protocols'
import { LoadAccountByCpfController } from '@/presentation/controllers'

export const makeLoadAccountByCpfController = (): Controller => {
  const controller = new LoadAccountByCpfController(makeDbLoadAccountByCpf())
  return makeLogControllerDecorator(controller)
}
