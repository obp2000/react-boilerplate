import React from 'react'
import { Form } from 'react-final-form'
import { useRouter } from 'next/dist/client/router'
import type { FormProps } from 'react-final-form'
import { useOptionsOuery } from '../options/hooks'
import SearchFormRender from './SearchFormRender'
import { SearchTerm, CommonConsts } from '../../../interfaces'

type Props = {
  indexUrl: string
}

type SearchFormAttrs = FormProps & {
  commonConsts?: CommonConsts
}

const SearchForm = ({ indexUrl }: Props): JSX.Element => {
  const router = useRouter()
  const { query } = router
  const { commonConsts } = useOptionsOuery(indexUrl)
  const searchFormAttrs: SearchFormAttrs = {
    name: 'search',
    onSubmit: ({ term }: SearchTerm) =>
      router.push({ query: { term } }, undefined, { shallow: true }),
    initialValues: { term: query.term },
    render: SearchFormRender,
    commonConsts,
  }
  return <Form  {...searchFormAttrs} />
}

export default SearchForm
