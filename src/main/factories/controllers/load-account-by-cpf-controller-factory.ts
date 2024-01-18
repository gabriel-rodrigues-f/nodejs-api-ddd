import { makeLogControllerDecorator } from '@/main/factories/decorators/log.controller-decorator-factory'
import { makeDbLoadAccountByCpf } from '@/main/factories/usecases/db-load-account-by-cpf-factory'
import { type Controller } from '@/presentation/protocols/controller'
import { LoadAccountByCpfController } from '@/presentation/controllers/account/load-account-by-cpf/load-account-by-cpf-controller'

export const makeLoadAccountByCpfController = (): Controller => {
  const controller = new LoadAccountByCpfController(makeDbLoadAccountByCpf())
  return makeLogControllerDecorator(controller)
}
