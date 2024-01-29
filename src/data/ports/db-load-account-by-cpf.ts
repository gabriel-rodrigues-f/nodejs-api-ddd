import { type AccountModel } from '@/domain/models'
import { type ILoadAccountByCPF } from '@/domain/ports'
import { type ILoadAccountByCPFRepository } from '@/data/adapters'

export class DbLoadAccountByCpf implements ILoadAccountByCPF {
  constructor (private readonly repository: ILoadAccountByCPFRepository) { }
  async loadByCpf (cpf: string): Promise<AccountModel> {
    return await this.repository.loadByCpf(cpf)
  }
}
