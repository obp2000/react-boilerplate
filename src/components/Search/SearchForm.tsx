import React from 'react'
import { Form } from 'react-final-form'
import { useRouter } from 'next/dist/client/router'
import type { FormProps } from 'react-final-form'
import SearchFormRender from './SearchFormRender'
import { SearchTerm, CommonConstsType } from '../../../interfaces'

const SearchForm = ({ commonConsts }: CommonConstsType): JSX.Element => {
  const router = useRouter()
  const { query } = router
  const searchFormAttrs: FormProps & CommonConstsType = {
    name: 'search',
    onSubmit: ({ term }: SearchTerm) =>
      router.push({ query: { term } }),
    initialValues: { term: query.term },
    render: SearchFormRender,
    commonConsts,
  }
  return <Form  {...searchFormAttrs} />
}

export default SearchForm
