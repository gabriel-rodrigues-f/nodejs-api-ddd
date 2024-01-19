import { DbLoadProductByCategory } from '@/data/usecases'
import { type LoadProductByCategoryRepository } from '@/data/protocols'
import { type ProductModel } from '@/domain/models'

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

const mockLoadProductByCategoryRepository = (): LoadProductByCategoryRepository => {
  class LoadProductByCategoryRepositoryStub implements LoadProductByCategoryRepository {
    async loadByCategory (category: string): Promise<ProductModel[]> {
      return await Promise.resolve(mockProducts())
    }
  }
  return new LoadProductByCategoryRepositoryStub()
}

type SutType = {
  sut: DbLoadProductByCategory
  loadProductByCategoryRepositoryStub: LoadProductByCategoryRepository
}

const mockSut = (): SutType => {
  const loadProductByCategoryRepositoryStub = mockLoadProductByCategoryRepository()
  const sut = new DbLoadProductByCategory(loadProductByCategoryRepositoryStub)
  return {
    sut,
    loadProductByCategoryRepositoryStub
  }
}

describe('DbLoadProductByCategory Usecase', () => {
  test('Should call LoadProductByCategoryRepository with correct values', async () => {
    const { sut, loadProductByCategoryRepositoryStub } = mockSut()
    const loadByCategorySpy = jest.spyOn(loadProductByCategoryRepositoryStub, 'loadByCategory')
    await sut.loadByCategory('any_category')
    expect(loadByCategorySpy).toHaveBeenCalledWith('any_category')
  })
  test('Should throw if LoadProductByCategoryRepository throws', async () => {
    const { sut, loadProductByCategoryRepositoryStub } = mockSut()
    jest.spyOn(loadProductByCategoryRepositoryStub, 'loadByCategory').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadByCategory('any_category')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a product on success', async () => {
    const { sut } = mockSut()
    const product = await sut.loadByCategory('any_category')
    expect(product).toEqual(mockProducts())
  })
})
