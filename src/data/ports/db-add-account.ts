import { type AccountModel } from '@/domain/models'
import { type AddAccountParams, type AddAccount } from '@/domain/ports'
import {
  type IHasher,
  type IAddAccountRepository,
  type LoadAccountByEmailRepository
} from '@/data/adapters'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly addRepository: IAddAccountRepository,
    private readonly loadRepository: LoadAccountByEmailRepository
  ) { }

  async add (params: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadRepository.loadByEmail(params.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(params.password)
      return await this.addRepository.add(Object.assign({}, params, { password: hashedPassword }))
    }
    return null
  }
}
