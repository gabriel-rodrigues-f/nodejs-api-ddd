export interface DeleteProductRepository {
  delete: (id: string) => Promise<void>
}
