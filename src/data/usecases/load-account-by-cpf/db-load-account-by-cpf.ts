import { type LoadAccountByCpf } from '@/domain/usecases/load-account-by-cpf'
import { type AccountModel } from '../authentication/db-authentication-protocols'
import { type LoadAccountByCpfRepository } from '@/data/protocols/db/account/load-account-by-cpf-repository'

export class DbLoadAccountByCpf implements LoadAccountByCpf {
  constructor (private readonly loadAccountByCpfRepository: LoadAccountByCpfRepository) { }
  async loadByCpf (cpf: string): Promise<AccountModel> {
    await this.loadAccountByCpfRepository.loadByCpf(cpf)
    return await Promise.resolve(null)
  }
}
