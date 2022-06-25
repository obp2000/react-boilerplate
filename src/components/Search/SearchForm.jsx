import React from 'react'
import {useSearchParams} from 'react-router-dom'
import {Form} from 'react-final-form'
import SearchFormRender from './SearchFormRender'

const SearchForm = (props) => {
  const [_, setSearchParams] = useSearchParams()
  return <Form name='search'
    onSubmit={({term}) => setSearchParams({term})}
    render={SearchFormRender}
    {...props}
  />
}

export default SearchForm
