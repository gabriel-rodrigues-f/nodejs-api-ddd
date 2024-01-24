import { type Order } from '@/domain/models'
import { type LoadOrders } from '@/domain/usecases'
import { type LoadOrdersRepository } from '@/data/protocols'
import { DbLoadOrders } from '@/data/usecases'

const mockOrders = (): Order[] => ([
  {
    number: 1,
    customer: 'any_customer',
    products: [
      {
        id: '65aa013deca75aaae89c3a1b',
        totalItems: 2,
        unitPrice: 2000,
        amount: 4000
      }
    ],
    status: 'any_status',
    createdAt: new Date(),
    updatedAt: new Date(),
    amount: 4000
  },
  {
    number: 2,
    customer: 'other_customer',
    products: [
      {
        id: '65aa013deca75aaae89c3a1b',
        totalItems: 2,
        unitPrice: 2000,
        amount: 4000
      }
    ],
    status: 'other_status',
    createdAt: new Date(),
    updatedAt: new Date(),
    amount: 4000
  }
])

const mockOrdersRepository = (): LoadOrdersRepository => {
  class LoadOrdersRepositoryStub implements LoadOrdersRepository {
    async loadAll (): Promise<Order[]> {
      return await Promise.resolve(mockOrders())
    }
  }
  return new LoadOrdersRepositoryStub()
}

interface SutTypes {
  sut: LoadOrders
  loadOrdersRepositoryStub: LoadOrdersRepository
}

const mockSut = (): SutTypes => {
  const loadOrdersRepositoryStub = mockOrdersRepository()
  const sut = new DbLoadOrders(loadOrdersRepositoryStub)
  return {
    sut,
    loadOrdersRepositoryStub
  }
}

describe('LoadOrders Usecase', () => {
  test('Should call LoadOrdersRepository', async () => {
    const { sut, loadOrdersRepositoryStub } = mockSut()
    const loadAllSpy = jest.spyOn(loadOrdersRepositoryStub, 'loadAll')
    await sut.loadAll({})
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Orders on success', async () => {
    const { sut } = mockSut()
    const orders = await sut.loadAll({})
    expect(orders).toEqual(mockOrders())
  })
})
