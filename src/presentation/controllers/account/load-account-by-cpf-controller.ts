import { notFound, type Controller, type HttpResponse, type LoadAccountByCpf } from './load-account-by-cpf-controller-protocols'

export class LoadAccountByCpfController implements Controller {
  constructor (private readonly loadAccountByCpf: LoadAccountByCpf) { }
  async handle (request: any): Promise<HttpResponse> {
    const { id: cpf } = request.params
    const exists = await this.loadAccountByCpf.loadByCpf(cpf)
    if (!exists) {
      return notFound()
    }
    return await Promise.resolve(null)
  }
}
