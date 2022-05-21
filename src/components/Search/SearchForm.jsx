import React from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
import {useSearchParams} from 'react-router-dom'
import {Form} from 'react-final-form'
import SearchFormRender from './SearchFormRender'

const SearchForm = (props) => {
  const setSearchParams = useSearchParams()[1]
  return <Form name='search'
    // validate={validate}
    onSubmit={({term}) => setSearchParams({term})}
    render={SearchFormRender}
    {...props}
  />
}

export default SearchForm
