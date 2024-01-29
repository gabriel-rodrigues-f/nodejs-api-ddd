import { type LoadAccountByCpf } from '@/domain/ports'
import {
  ok,
  notFound,
  serverError
} from '@/presentation/helpers'
import {
  type Controller,
  type HttpResponse
} from '@/presentation/protocols'

export class LoadAccountByCpfController implements Controller {
  constructor (private readonly loadAccountByCpf: LoadAccountByCpf) { }
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { cpf } = request.params
      const account = await this.loadAccountByCpf.loadByCpf(cpf)
      if (!account) return notFound()
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
