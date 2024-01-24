import { DbUpdateOrder } from '@/data/usecases'
import { type UpdateOrderRepository } from '@/data/protocols'
import { type UpdateOrderParams } from '@/domain/usecases'

const mockUpdateParams = (): UpdateOrderParams => ({
  id: 'any_id',
  status: 'any_status'
})

const mockUpdateOrderRepositoryStub = (): UpdateOrderRepository => {
  class UpdateOrderStub implements UpdateOrderRepository {
    async updateOrder (params: any): Promise<void> {
      await Promise.resolve(null)
    }
  }
  return new UpdateOrderStub()
}

type SutTypes = {
  sut: DbUpdateOrder
  updateOrderRepositoryStub: UpdateOrderRepository
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

  test('Shoud throw Error if UpdateOrderRepository Throw Error', async () => {
    const { sut, updateOrderRepositoryStub } = mockSut()
    jest.spyOn(updateOrderRepositoryStub, 'updateOrder').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.update(mockUpdateParams())
    await expect(promise).rejects.toThrow()
  })
})
