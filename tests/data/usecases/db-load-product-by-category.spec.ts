import { DbLoadProductByCategory } from '@/data/usecases'
import { type LoadProductByCategoryRepository } from '@/data/protocols'
import { type ProductModel } from '@/domain/models'

const mockProducts = (): ProductModel[] => ([
  {
    id: 'any_id',
    category: 'any_category',
    name: 'any_name',
    price: 'any_price',
    description: 'any_description',
    image: 'any_image'
  },
  {
    id: 'other_id',
    category: 'other_category',
    name: 'other_name',
    price: 'other_price',
    description: 'other_description',
    image: 'other_image'
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
