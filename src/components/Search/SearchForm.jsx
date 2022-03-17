import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'react-final-form'
import { validate } from './Validators'
import { onSubmit } from '../redux/Search'
import SearchFormRender from './SearchFormRender'

const SearchForm = ({
    location: {
        pathname
    }
}) => {
    const dispatch = useDispatch()
    return <Form name='search'
              // validate={validate}
              onSubmit={onSubmit(dispatch, pathname)}
              render={SearchFormRender}
              pathname={pathname}
            />
}

SearchForm.propTypes = {
    pathname: PropTypes.string,
}

export default SearchForm