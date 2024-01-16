import {
  type LoadProductById,
  type ProductModel,
  type LoadProductByIdRepository
} from '.'

export class DbLoadProductById implements LoadProductById {
  constructor (private readonly loadProductByIdRepository: LoadProductByIdRepository) { }
  async loadById (id: string): Promise<ProductModel> {
    return await this.loadProductByIdRepository.loadById(id)
  }
}
