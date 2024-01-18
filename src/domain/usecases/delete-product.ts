export interface DeleteProduct {
  delete: (id: string) => Promise<void>
}
