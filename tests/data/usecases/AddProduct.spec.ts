import { AddProduct } from '@/data/ports'
import { type AddProductParams } from '@/domain/ports'
import { type IAddProductRepository } from '@/data/adapters'

const mockAddProductParams = (): AddProductParams => ({
  category: 'any_category',
  name: 'any_name',
  price: 'any_price',
  description: 'any_description',
  image: 'any_image'
})

interface SutTypes {
  sut: AddProduct
  addProductRepositoryStub: IAddProductRepository
}

const mockAddProductRepository = (): IAddProductRepository => {
  class AddProductRepositoryStub implements IAddProductRepository {
    async add (params: AddProductParams): Promise<void> {
      return await Promise.resolve()
    }
  }
  const addProductRepositoryStub = new AddProductRepositoryStub()
  return addProductRepositoryStub
}

const mockSut = (): SutTypes => {
  const addProductRepositoryStub = mockAddProductRepository()
  const sut = new AddProduct(addProductRepositoryStub)
  return {
    sut,
    addProductRepositoryStub
  }
}

describe('AddProduct Usecase', () => {
  test('Should call IAddProductRepository usign correct values', async () => {
    const { sut, addProductRepositoryStub } = mockSut()
    const addSpy = jest.spyOn(addProductRepositoryStub, 'add')
    const addProductData = mockAddProductParams()
    await sut.add(addProductData)
    expect(addSpy).toHaveBeenCalledWith(addProductData)
  })

  test('Shoud throw Error if IHasher Throw Error', async () => {
    const { sut, addProductRepositoryStub } = mockSut()
    jest.spyOn(addProductRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockAddProductParams())
    await expect(promise).rejects.toThrow()
  })
})
