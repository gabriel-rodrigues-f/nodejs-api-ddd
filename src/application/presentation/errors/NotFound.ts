export class NotFound extends Error {
  constructor () {
    super('Not Found')
    this.name = 'NotFound'
  }
}
