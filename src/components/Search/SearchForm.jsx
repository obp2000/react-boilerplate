import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Form } from 'react-final-form'
// import { validate } from './Validators'
import { onSubmit } from '../redux/Search'
import SearchFormRender from './SearchFormRender'

const SearchForm = () => {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    return <Form name='search'
              // validate={validate}
              onSubmit={onSubmit(dispatch, pathname)}
              render={SearchFormRender}
            />
}

export default SearchForm