export class Unauthorized extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'Unauthorized'
  }
}
