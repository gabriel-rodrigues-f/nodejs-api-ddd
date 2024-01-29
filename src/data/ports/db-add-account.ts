import { type AccountModel } from '@/domain/models'
import { type AddAccountParams, type AddAccount } from '@/domain/ports'
import {
  type IHasher,
  type AddAccountRepository,
  type LoadAccountByEmailRepository
} from '@/data/adapters'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      return await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    }
    return null
  }
}
