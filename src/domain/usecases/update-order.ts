export type UpdateOrderParams = {
  id: string
  status: string
}

export interface UpdateOrder {
  update: (params: UpdateOrderParams) => Promise<void>
}
