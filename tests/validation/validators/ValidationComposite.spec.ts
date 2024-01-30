import { type IValidation } from '@/core/ports/driving/presentation'
import { MissingParam } from '@/application/presentation/errors'
import { ValidationComposite } from '@/validation/validators'

const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: IValidation[]
}

const mockSut = (): SutTypes => {
  const validationStubs = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('IValidation Composite', () => {
  test('Should return an error if any validation fails ', () => {
    const { sut, validationStubs } = mockSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParam('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParam('field'))
  })

  test('Should return the first error if more than one validations fails', () => {
    const { sut, validationStubs } = mockSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParam('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('Should not return if validation success', () => {
    const { sut } = mockSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
