export interface IDeleteProductRepository {
  delete: (id: string) => Promise<void>
}
