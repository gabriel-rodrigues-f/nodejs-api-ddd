import {
  type Validation,
  type HttpRequest
} from '@/presentation/protocols'
import { AddOrderController } from '@/presentation/controllers'
import { badRequest, serverError } from '@/presentation/helpers'
import { type Order } from '@/domain/models'
import { type AddOrder, type AddOrderParams } from '@/domain/usecases/add-order'

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

const mockRequest = (): HttpRequest => ({
  body: mockAddOrderParams()
})

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const mockAddOrder = (): AddOrder => {
  class AddOrderStub implements AddOrder {
    async add (order: AddOrderParams): Promise<Order> {
      return await Promise.resolve(null)
    }
  }
  return new AddOrderStub()
}

type SutTypes = {
  sut: AddOrderController
  addOrderStub: AddOrder
  validationStub: Validation
}

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addOrderStub = mockAddOrder()
  const sut = new AddOrderController(validationStub, addOrderStub)
  return {
    sut,
    validationStub,
    addOrderStub
  }
}

describe('AddOrderController', () => {
  test('Should call AddOrder Usecase with a correct values ', async () => {
    const { sut, validationStub } = mockSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call AddProduct with correct values', async () => {
    const { sut, addOrderStub } = mockSut()
    const addProductSpy = jest.spyOn(addOrderStub, 'add')
    const request = mockRequest()
    await sut.handle(request)
    expect(addProductSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 500 if AddProduct throws', async () => {
    const { sut, addOrderStub } = mockSut()
    jest.spyOn(addOrderStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
