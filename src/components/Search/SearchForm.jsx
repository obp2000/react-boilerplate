import PropTypes from 'prop-types'
import React from 'react'
import {Form} from 'react-final-form'
import {useSearchForm} from './hooks'

const SearchForm = (props) => {
  const searchFormAttrs = useSearchForm(props)
  return <Form {...searchFormAttrs} />
}

SearchForm.propTypes = {
  props: PropTypes.object,
}

export default SearchForm
