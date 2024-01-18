import { DbLoadProductById } from './db-load-product-by-id'
import {
  type LoadProductByIdRepository,
  type ProductModel
} from '.'

const mockProduct = (): ProductModel => ({
  id: 'any_id',
  category: 'any_category',
  name: 'any_name',
  price: 'any_price',
  nutritionalInformation: {
    calorie: 'any_calorie',
    carbohydrate: 'any_carbohydrate',
    total_sugars: 'any_total_sugars',
    added_sugars: 'any_added_sugars',
    proteins: 'any_proteins',
    total_fat: 'any_total_fat',
    saturated_fat: 'any_saturated_fat',
    trans_fats: 'any_trans_fats',
    dietary_fiber: 'any_dietary_fiber',
    sodium: 'any_sodium'
  }
})

const mockLoadProductByIdRepository = (): LoadProductByIdRepository => {
  class LoadProductByIdRepositoryStub implements LoadProductByIdRepository {
    async loadById (id: string): Promise<ProductModel> {
      return await Promise.resolve(mockProduct())
    }
  }
  return new LoadProductByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadProductById
  loadProductByIdRepositoryStub: LoadProductByIdRepository
}

const mockSut = (): SutTypes => {
  const loadProductByIdRepositoryStub = mockLoadProductByIdRepository()
  const sut = new DbLoadProductById(loadProductByIdRepositoryStub)
  return {
    sut,
    loadProductByIdRepositoryStub
  }
}

describe('LoadProductById Usecase', () => {
  test('Should call LoadProductByIdRepository with correct values', async () => {
    const { sut, loadProductByIdRepositoryStub } = mockSut()
    const loadByIdSpy = jest.spyOn(loadProductByIdRepositoryStub, 'loadById')
    await sut.loadById('any_productId')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_productId')
  })

  test('Should thorws if LoadProductByIdRepository throws', async () => {
    const { sut, loadProductByIdRepositoryStub } = mockSut()
    jest.spyOn(loadProductByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadById('any_productId')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a product on success', async () => {
    const { sut } = mockSut()
    const product = await sut.loadById('any_productId')
    expect(product).toEqual(mockProduct())
  })
})
