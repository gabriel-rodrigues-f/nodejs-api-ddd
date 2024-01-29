import {
  type UpdateProductParams,
  type IUpdateProductRepository
} from '@/data/adapters'
import { DbUpdateProduct } from '@/data/ports'

const updateParams = (): UpdateProductParams => ({
  body: {
    category: 'other_category',
    name: 'any_name',
    price: 'any_price',
    description: 'any_description',
    image: 'any_image'
  },
  id: 'any_id'
})

const mockUpdateProductRepositoryStub = (): IUpdateProductRepository => {
  class UpdateProductStub implements IUpdateProductRepository {
    async update (params: any): Promise<void> {
      await Promise.resolve(null)
    }
  }
  return new UpdateProductStub()
}

type SutTypes = {
  sut: DbUpdateProduct
  updateProductRepositoryStub: IUpdateProductRepository
}

const mockSut = (): SutTypes => {
  const updateProductRepositoryStub = mockUpdateProductRepositoryStub()
  const sut = new DbUpdateProduct(updateProductRepositoryStub)
  return {
    sut,
    updateProductRepositoryStub
  }
}

describe('IUpdateProduct Usecase', () => {
  test('Should call IUpdateProduct Repository with correct values', async () => {
    const { sut, updateProductRepositoryStub } = mockSut()
    const updateSpy = jest.spyOn(updateProductRepositoryStub, 'update')
    await sut.update(updateParams())
    expect(updateSpy).toHaveBeenCalledWith(updateParams())
  })

  test('Shoud throw Error if IUpdateProductRepository Throw Error', async () => {
    const { sut, updateProductRepositoryStub } = mockSut()
    jest.spyOn(updateProductRepositoryStub, 'update').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.update(updateParams())
    await expect(promise).rejects.toThrow()
  })
})
