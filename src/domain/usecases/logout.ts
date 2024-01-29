export type IRequestLogout = {
  accessToken: string
  id: string
}

export interface Logout {
  logout: ({ accessToken, id }: IRequestLogout) => Promise<void>
}
