import { LogMongoRepository } from '@/infra/db/mongodb'
import { LogControllerDecorator } from '@/main/decorators'
import { type IController } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
