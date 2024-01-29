import {
  type IValidation,
  type IHTTPRequest
} from '@/presentation/protocols'
import { AddOrderController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { type Order } from '@/domain/models'
import { type IAddOrder, type AddOrderParams } from '@/domain/ports/IAddOrder'

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
  status: 'any_status',
  createdAt: new Date(),
  updatedAt: new Date(),
  amount: 4000
})

const mockRequest = (): IHTTPRequest => ({
  body: mockAddOrderParams()
})

const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const mockAddOrder = (): IAddOrder => {
  class AddOrderStub implements IAddOrder {
    async add (order: AddOrderParams): Promise<Order> {
      return await Promise.resolve(null)
    }
  }
  return new AddOrderStub()
}

type SutTypes = {
  sut: AddOrderController
  addOrderStub: IAddOrder
  validationStub: IValidation
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
  test('Should call IAddOrder Usecase with a correct values ', async () => {
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

  test('Should call IAddProduct with correct values', async () => {
    const { sut, addOrderStub } = mockSut()
    const addProductSpy = jest.spyOn(addOrderStub, 'add')
    const request = mockRequest()
    await sut.handle(request)
    expect(addProductSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 500 if IAddProduct throws', async () => {
    const { sut, addOrderStub } = mockSut()
    jest.spyOn(addOrderStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 500 if IAddProduct throws', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
