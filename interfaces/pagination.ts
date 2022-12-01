import { ParsedUrlQuery } from 'querystring'

export type TotalPages = {
  totalPages: number
}

export type Page = {
  label: string
  query?: ParsedUrlQuery
  search?: string
  active?: boolean
}
