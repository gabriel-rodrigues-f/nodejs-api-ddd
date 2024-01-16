import {
  type Controller,
  type HttpResponse,
  type LoadAccountByCpf,
  serverError,
  notFound,
  ok
} from './load-account-by-cpf-controller-protocols'

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
