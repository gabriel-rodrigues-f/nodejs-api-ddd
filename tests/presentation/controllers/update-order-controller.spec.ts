import {
  type Validation,
  type HttpRequest
} from '@/presentation/protocols'
import { UpdateOrderController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import {
  type UpdateOrder,
  type UpdateOrderParams
} from '@/domain/usecases'

const mockRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  },
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

const mockUpdateOrder = (): UpdateOrder => {
  class UpdateOrderStub implements UpdateOrder {
    async update (params: UpdateOrderParams): Promise<void> {
      return await Promise.resolve(null)
    }
  }
  return new UpdateOrderStub()
}

type SutTypes = {
  sut: UpdateOrderController
  validationStub: Validation
  updateOrderStub: UpdateOrder
}

const mockSut = (): SutTypes => {
  const updateOrderStub = mockUpdateOrder()
  const validationStub = mockValidation()
  const sut = new UpdateOrderController(validationStub, updateOrderStub)
  return {
    sut,
    validationStub,
    updateOrderStub
  }
}

describe('UpdateOrder Controller', () => {
  test('Should call UpdateOrder with correct values', async () => {
    const { sut, validationStub } = mockSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockRequest().body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call UpdateOrder with correct values', async () => {
    const { sut, updateOrderStub } = mockSut()
    const updateSpy = jest.spyOn(updateOrderStub, 'update')
    await sut.handle(mockRequest())
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'any_id',
      status: 'any_status'
    })
  })

  test('Should return 500 if UpdateProduct throws', async () => {
    const { sut, updateOrderStub } = mockSut()
    jest.spyOn(updateOrderStub, 'update').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(noContent())
  })
})
