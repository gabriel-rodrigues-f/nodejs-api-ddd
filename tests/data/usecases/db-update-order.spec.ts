import { DbUpdateOrder } from '@/data/ports'
import { type IUpdateOrderRepository } from '@/data/adapters'
import { type UpdateOrderParams } from '@/domain/ports'

const mockUpdateParams = (): UpdateOrderParams => ({
  id: 'any_id',
  status: 'any_status'
})

const mockUpdateOrderRepositoryStub = (): IUpdateOrderRepository => {
  class UpdateOrderStub implements IUpdateOrderRepository {
    async updateOrder (params: any): Promise<void> {
      await Promise.resolve(null)
    }
  }
  return new UpdateOrderStub()
}

type SutTypes = {
  sut: DbUpdateOrder
  updateOrderRepositoryStub: IUpdateOrderRepository
}

const mockSut = (): SutTypes => {
  const updateOrderRepositoryStub = mockUpdateOrderRepositoryStub()
  const sut = new DbUpdateOrder(updateOrderRepositoryStub)
  return {
    sut,
    updateOrderRepositoryStub
  }
}

describe('UpdateOrder Usecase', () => {
  test('Should call UpdateOrder Repository with correct values', async () => {
    const { sut, updateOrderRepositoryStub } = mockSut()
    const updateSpy = jest.spyOn(updateOrderRepositoryStub, 'updateOrder')
    await sut.update(mockUpdateParams())
    expect(updateSpy).toHaveBeenCalledWith(mockUpdateParams())
  })

  test('Shoud throw Error if IUpdateOrderRepository Throw Error', async () => {
    const { sut, updateOrderRepositoryStub } = mockSut()
    jest.spyOn(updateOrderRepositoryStub, 'updateOrder').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.update(mockUpdateParams())
    await expect(promise).rejects.toThrow()
  })
})
