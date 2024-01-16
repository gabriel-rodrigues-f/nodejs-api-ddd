import { notFound, type Controller, type HttpResponse, type LoadAccountByCpf, serverError } from './load-account-by-cpf-controller-protocols'

export class LoadAccountByCpfController implements Controller {
  constructor (private readonly loadAccountByCpf: LoadAccountByCpf) { }
  async handle (request: any): Promise<HttpResponse> {
    try {
      const { id: cpf } = request.params
      const exists = await this.loadAccountByCpf.loadByCpf(cpf)
      if (!exists) {
        return notFound()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
