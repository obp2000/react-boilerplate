import type { FormRenderProps } from 'react-final-form'
import type { CommonConstsType } from './commonConsts'

export type SearchTerm = {
  term?: string | string[]
}

export type SearchObjectsArg = {
  url: string,
  params: {
    term: string
    page?: number
  }
}

export type SearchFormProps = FormRenderProps & CommonConstsType
