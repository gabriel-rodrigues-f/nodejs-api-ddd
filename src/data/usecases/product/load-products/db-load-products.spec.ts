import { DbLoadProducts } from './db-load-products'
import {
  type ProductModel,
  type LoadProductsRepository,
  type LoadProducts
} from '.'

const mockProducts = (): ProductModel[] => ([
  {
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
  },
  {
    id: 'other_id',
    category: 'other_category',
    name: 'other_name',
    price: 'other_price',
    nutritionalInformation: {
      calorie: 'other_calorie',
      carbohydrate: 'other_carbohydrate',
      total_sugars: 'other_total_sugars',
      added_sugars: 'other_added_sugars',
      proteins: 'other_proteins',
      total_fat: 'other_total_fat',
      saturated_fat: 'other_saturated_fat',
      trans_fats: 'other_trans_fats',
      dietary_fiber: 'other_dietary_fiber',
      sodium: 'other_sodium'
    }
  }
])

const mockProductsRepository = (): LoadProductsRepository => {
  class LoadProductsRepositoryStub implements LoadProductsRepository {
    async loadAll (): Promise<ProductModel[]> {
      return await Promise.resolve(mockProducts())
    }
  }
  return new LoadProductsRepositoryStub()
}

interface SutTypes {
  sut: LoadProducts
  loadProductsRepositoryStub: LoadProductsRepository
}

const mockSut = (): SutTypes => {
  const loadProductsRepositoryStub = mockProductsRepository()
  const sut = new DbLoadProducts(loadProductsRepositoryStub)
  return {
    sut,
    loadProductsRepositoryStub
  }
}

describe('DbLoadProducts', () => {
  test('Should call LoadProductsRepository', async () => {
    const { sut, loadProductsRepositoryStub } = mockSut()
    const loadAllSpy = jest.spyOn(loadProductsRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Products on success', async () => {
    const { sut } = mockSut()
    const products = await sut.load()
    expect(products).toEqual(mockProducts())
  })

  test('Should throw if LoadProductsRepository throws', async () => {
    const { sut, loadProductsRepositoryStub } = mockSut()
    jest.spyOn(loadProductsRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
