import { type Order } from '@/domain/models'
import { type LoadOrders } from '@/domain/ports'
import { type HttpRequest } from '@/presentation/protocols'
import { LoadOrdersController } from '@/presentation/controllers'
import { noContent, serverError } from '@/presentation/helpers'

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
      },
      {
        id: '65aa013deca75aaae89c3a1c',
        totalItems: 3,
        unitPrice: 6000,
        amount: 6000
      }
    ],
    status: 'any_status',
    createdAt: new Date(),
    updatedAt: new Date(),
    amount: 4000
  }
])

const mockRequest = (): HttpRequest => ({
  query: {
    status: 'any_status'
  }
})

const mockLoadOrderStub = (): LoadOrders => {
  class LoadOrdersStub implements LoadOrders {
    async loadAll (): Promise<Order[]> {
      return await Promise.resolve(mockOrders())
    }
  }
  return new LoadOrdersStub()
}

interface SutType {
  sut: LoadOrdersController
  loadOrdersStub: LoadOrders
}

const mockSut = (): SutType => {
  const loadOrdersStub = mockLoadOrderStub()
  const sut = new LoadOrdersController(loadOrdersStub)
  return {
    sut,
    loadOrdersStub
  }
}

describe('LoadOrder Controller', () => {
  test('Should call LoadOrders', async () => {
    const { sut, loadOrdersStub } = mockSut()
    const loadSpy = jest.spyOn(loadOrdersStub, 'loadAll')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalledWith({})
  })

  test('Should return an order on success', async () => {
    const { sut, loadOrdersStub } = mockSut()
    jest.spyOn(loadOrdersStub, 'loadAll').mockReturnValueOnce(Promise.resolve([mockOrders()[1]]))
    const response = await sut.handle(mockRequest())
    expect(response.body.length).toEqual(1)
  })

  test('Should return 204 LoadOrder returns empty', async () => {
    const { sut, loadOrdersStub } = mockSut()
    jest.spyOn(loadOrdersStub, 'loadAll').mockReturnValueOnce(Promise.resolve([]))
    const response = await sut.handle({})
    expect(response).toEqual(noContent())
  })

  test('Should 500 if LoadOrders throws', async () => {
    const { sut, loadOrdersStub } = mockSut()
    jest.spyOn(loadOrdersStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })
})
