import { InvalidParamError } from '@/presentation/errors'
import { CpfValidation } from '.'

const mockSut = (): CpfValidation => new CpfValidation('cpf')

describe('CPF Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = mockSut()
    const error = sut.validate('wrong_cpf')
    expect(error).toEqual(new InvalidParamError('cpf'))
  })

  test('Should not return if a valid cpf is provided', () => {
    const sut = mockSut()
    const error = sut.validate({
      cpf: '123.456.789-09'
    })
    expect(error).toBeFalsy()
  })
})
