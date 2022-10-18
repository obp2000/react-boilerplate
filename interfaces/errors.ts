export type Errors = {
  [index: string]: string
}

export interface SerializedError {
  name?: string
  message?: string
  stack?: string
  code?: string
}
