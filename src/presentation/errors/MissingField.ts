export class MissingField extends Error {
  constructor (fields: string) {
    super(`At least one field is required ${fields}`)
    this.name = 'MissingField'
  }
}
