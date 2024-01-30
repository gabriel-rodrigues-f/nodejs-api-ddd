export type UpdateOrderParams = {
  id: string
  status: string
}

export interface IUpdateOrder {
  update: (params: UpdateOrderParams) => Promise<void>
}
