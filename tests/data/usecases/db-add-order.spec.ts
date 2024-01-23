import { type Order } from '@/domain/models'
import {
  type AddOrderParams,
  type AddOrderRepository
} from '@/data/protocols'
import { DbAddOrder } from '@/data/usecases'

const mockAddOrderParams = (): AddOrderParams => ({
  customer: 'any_customer',
  products: [
    {
      id: '65aa013deca75aaae89c3a1b',
      totalItems: 2,
      unitPrice: 2000,
      amount: 4000
    }
  ],
  status: 'pending',
  createdAt: new Date(),
  updatedAt: new Date(),
  amount: 4000
})

const mockAddOrderRepository = (): AddOrderRepository => {
  class AddOrderRepositoryStub implements AddOrderRepository {
    async add (params: AddOrderParams): Promise<Order> {
      return await Promise.resolve(null)
    }
  }
  const addOrderRepositoryStub = new AddOrderRepositoryStub()
  return addOrderRepositoryStub
}

type SutTypes = {
  sut: DbAddOrder
  addOrderRepositoryStub: AddOrderRepository
}

const mockSut = (): SutTypes => {
  const addOrderRepositoryStub = mockAddOrderRepository()
  const sut = new DbAddOrder(addOrderRepositoryStub)
  return {
    sut,
    addOrderRepositoryStub
  }
}

describe('AddOrder Usecase', () => {
  test('Should call AddOrderRepository usign correct values', async () => {
    const { sut, addOrderRepositoryStub } = mockSut()
    const addSpy = jest.spyOn(addOrderRepositoryStub, 'add')
    const addOrderData = mockAddOrderParams()
    await sut.add(addOrderData)
    expect(addSpy).toHaveBeenCalledWith(addOrderData)
  })
})
