import { type AccountModel } from '@/domain/models'
import { type LoadAccountByCpf } from '@/domain/usecases'
import { type LoadAccountByCpfRepository } from '@/data/protocols'

export class DbLoadAccountByCpf implements LoadAccountByCpf {
  constructor (private readonly loadAccountByCpfRepository: LoadAccountByCpfRepository) { }
  async loadByCpf (cpf: string): Promise<AccountModel> {
    return await this.loadAccountByCpfRepository.loadByCpf(cpf)
  }
}
