import { type Controller } from '@/presentation/protocols/controller'
import { LoadAccountByCpfController } from '@/presentation/controllers/account/load-account-by-cpf-controller'
import { makeLogControllerDecorator } from '../decorators/log.controller-decorator-factory'
import { makeDbLoadAccountByCpf } from '../usecases/db-load-account-by-cpf-factory'

export const makeLoadAccountByCpfController = (): Controller => {
  const controller = new LoadAccountByCpfController(makeDbLoadAccountByCpf())
  return makeLogControllerDecorator(controller)
}
