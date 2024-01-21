import { DbLoadProducts } from '@/data/usecases'
import { type ProductModel } from '@/domain/models'
import { type LoadProducts } from '@/domain/usecases'
import { type LoadProductsRepository } from '@/data/protocols'

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
