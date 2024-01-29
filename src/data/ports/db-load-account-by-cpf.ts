import { type AccountModel } from '@/domain/models'
import { type LoadAccountByCpf } from '@/domain/ports'
import { type LoadAccountByCpfRepository } from '@/data/adapters'

export class DbLoadAccountByCpf implements LoadAccountByCpf {
  constructor (private readonly loadAccountByCpfRepository: LoadAccountByCpfRepository) { }
  async loadByCpf (cpf: string): Promise<AccountModel> {
    return await this.loadAccountByCpfRepository.loadByCpf(cpf)
  }
}
