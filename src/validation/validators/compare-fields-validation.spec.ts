import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from '.'

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation('field', 'fieldToCompare')

describe('Compare Fields validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_Value'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_password',
      fieldToCompare:
        'any_password'
    })
    expect(error).toBeFalsy()
  })
})
