import { type AccountModel } from '@/domain/models'
import { type LoadAccountByCpf } from '@/domain/ports'
import { type ILoadAccountByCPFRepository } from '@/data/adapters'

export class DbLoadAccountByCpf implements LoadAccountByCpf {
  constructor (private readonly repository: ILoadAccountByCPFRepository) { }
  async loadByCpf (cpf: string): Promise<AccountModel> {
    return await this.repository.loadByCpf(cpf)
  }
}
