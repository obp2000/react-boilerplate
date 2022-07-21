import PropTypes from 'prop-types'
import React from 'react'
import {Form} from 'react-final-form'
import {useSearchForm} from './hooks'

const SearchForm = ({label}) => {
  const searchFormAttrs = useSearchForm(label)
  return <Form {...searchFormAttrs} />
}

SearchForm.propTypes = {
  label: PropTypes.string,
}

export default SearchForm
