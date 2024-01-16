import { type Controller, type HttpResponse, type LoadAccountByCpf } from './load-account-by-cpf-controller-protocols'

export class LoadAccountByCpfController implements Controller {
  constructor (private readonly loadAccountByCpf: LoadAccountByCpf) { }
  async handle (request: any): Promise<HttpResponse> {
    const { id: cpf } = request.params
    await this.loadAccountByCpf.loadByCpf(cpf)
    return await Promise.resolve(null)
  }
}
