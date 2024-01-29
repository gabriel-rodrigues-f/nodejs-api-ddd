import { DbLoadProducts } from '@/data/ports'
import { type Product } from '@/domain/entities'
import { type ILoadProducts } from '@/domain/ports'
import { type ILoadProductsRepository } from '@/data/adapters'

const mockProducts = (): Product[] => ([
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

const mockProductsRepository = (): ILoadProductsRepository => {
  class LoadProductsRepositoryStub implements ILoadProductsRepository {
    async loadAll (): Promise<Product[]> {
      return await Promise.resolve(mockProducts())
    }
  }
  return new LoadProductsRepositoryStub()
}

interface SutTypes {
  sut: ILoadProducts
  loadProductsRepositoryStub: ILoadProductsRepository
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
  test('Should call ILoadProductsRepository', async () => {
    const { sut, loadProductsRepositoryStub } = mockSut()
    const loadAllSpy = jest.spyOn(loadProductsRepositoryStub, 'loadAll')
    await sut.load({})
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Products on success', async () => {
    const { sut } = mockSut()
    const products = await sut.load({})
    expect(products).toEqual(mockProducts())
  })

  test('Should throw if ILoadProductsRepository throws', async () => {
    const { sut, loadProductsRepositoryStub } = mockSut()
    jest.spyOn(loadProductsRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.load({})
    await expect(promise).rejects.toThrow()
  })
})
