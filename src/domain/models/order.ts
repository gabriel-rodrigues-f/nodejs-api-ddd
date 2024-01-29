export type Item = {
  id: string
  totalItems: number
  unitPrice: number
  amount: number
}

export type Order = {
  number: number
  customer: string
  status: string
  createdAt: Date
  updatedAt: Date
  amount: number
  products: Item[]
}
