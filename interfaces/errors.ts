export type Errors = {
  [index: string]: string
}

export interface SerializedError {
  name?: string
  message?: string
  stack?: string
  code?: string
}

export type NonFieldErrors = {
  non_field_errors: string[]
}

export type BadRequest = {
  status: 400
  data: NonFieldErrors
}
