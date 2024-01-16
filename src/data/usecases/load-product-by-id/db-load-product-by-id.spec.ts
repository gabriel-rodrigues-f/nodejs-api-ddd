import { DbLoadProductById } from './db-load-product-by-id'
import { type LoadProductByIdRepository, type ProductModel } from './db-load-product-by-id-protocols'

const makeFakeProduct = (): ProductModel => ({
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

const makeLoadProductByIdRepository = (): LoadProductByIdRepository => {
  class LoadProductByIdRepositoryStub implements LoadProductByIdRepository {
    async loadById (id: string): Promise<ProductModel> {
      return await Promise.resolve(makeFakeProduct())
    }
  }
  return new LoadProductByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadProductById
  loadProductByIdRepositoryStub: LoadProductByIdRepository
}

const makeSut = (): SutTypes => {
  const loadProductByIdRepositoryStub = makeLoadProductByIdRepository()
  const sut = new DbLoadProductById(loadProductByIdRepositoryStub)
  return {
    sut,
    loadProductByIdRepositoryStub
  }
}

describe('LoadProductById Usecase', () => {
  test('Should call LoadProductByIdRepository with correct values', async () => {
    const { sut, loadProductByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadProductByIdRepositoryStub, 'loadById')
    await sut.loadById('any_productId')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_productId')
  })

  test('Should call LoadProductByIdRepository with correct values', async () => {
    const { sut, loadProductByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadProductByIdRepositoryStub, 'loadById')
    await sut.loadById('any_productId')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_productId')
  })
})
