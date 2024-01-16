import { InvalidParamError } from '@/presentation/errors'
import { CpfValidation } from './cpf-validation'

const makeSut = (): CpfValidation => new CpfValidation('cpf')

describe('CPF Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate('wrong_cpf')
    expect(error).toEqual(new InvalidParamError('cpf'))
  })

  test('Should return not return if a valid cpf is provided', () => {
    const sut = makeSut()
    const error = sut.validate('123.456.789-09')
    expect(error).toBeFalsy()
  })
})
