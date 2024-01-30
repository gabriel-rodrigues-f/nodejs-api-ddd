export interface IHTTPResponse {
  statusCode: number
  body: any
}

export interface IHTTPRequest {
  body?: any
  headers?: any
  params?: any
  query?: any
}
