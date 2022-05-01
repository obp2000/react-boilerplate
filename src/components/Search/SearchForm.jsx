import PropTypes from 'prop-types'
import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Form } from 'react-final-form'
import querystring from 'querystring'
import SearchFormRender from './SearchFormRender'

const SearchForm = props => {
    const { pathname } = useLocation()
    const { push } = useHistory()
    const onSubmit = ({ term }) =>
      push(`${pathname}?${querystring.stringify({term})}`)
    return <Form name='search'
              // validate={validate}
              onSubmit={onSubmit}
              render={SearchFormRender}
              {...props}
            />
}

export default SearchForm
