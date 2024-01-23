import {
  type Validation,
  type HttpRequest
} from '@/presentation/protocols'
import { AddOrderController } from '@/presentation/controllers'

const mockAddOrderParams = (): any => ({
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

type SutTypes = {
  sut: AddOrderController
  validationStub: Validation
}

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new AddOrderController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('', () => {
  test('Should call AddOrder Usecase with a correct values ', async () => {
    const { sut, validationStub } = mockSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy).toHaveBeenCalledWith(request.body)
  })
})
