export interface IDeleteProduct {
  delete: (id: string) => Promise<void>
}
