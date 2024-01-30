import { LogMongoRepository } from '@/infrastructure/db/mongodb'
import { LogControllerDecorator } from '@/main/decorators'
import { type IController } from '@/core/ports/driving/presentation'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
