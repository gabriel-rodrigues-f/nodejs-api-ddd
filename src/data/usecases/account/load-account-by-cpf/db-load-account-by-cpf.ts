import {
  type LoadAccountByCpf,
  type AccountModel,
  type LoadAccountByCpfRepository
} from '.'

export class DbLoadAccountByCpf implements LoadAccountByCpf {
  constructor (private readonly loadAccountByCpfRepository: LoadAccountByCpfRepository) { }
  async loadByCpf (cpf: string): Promise<AccountModel> {
    return await this.loadAccountByCpfRepository.loadByCpf(cpf)
  }
}
