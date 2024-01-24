import {
  type Validation,
  type HttpRequest
} from '@/presentation/protocols'
import { UpdateOrderController } from '@/presentation/controllers'

const mockRequest = (): HttpRequest => ({
  body: {
    status: 'any_status'
  }
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
  sut: UpdateOrderController
  validationStub: Validation
}

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new UpdateOrderController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('UpdateOrder Controller', () => {
  test('Should call UpdateOrder with correct values', async () => {
    const { sut, validationStub } = mockSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockRequest().body)
  })
})
