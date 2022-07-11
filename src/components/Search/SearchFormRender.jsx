import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form} from 'reactstrap'
import Input from '../Shared/Input'
import SubmitButton from '../Shared/SubmitButton'

const SearchFormRender = ({
  handleSubmit,
  search,
  ...props
}) => <Form onSubmit={handleSubmit} inline className="d-flex mt-1">
    <Field name='term'
      type="search"
      placeholder={search}
      className="me-2"
      component={Input} />
    <SubmitButton text={search}
      className='btn-outline-light'
      {...props} />
  </Form>

SearchFormRender.propTypes = {
  handleSubmit: PropTypes.func,
  search: PropTypes.string,
  props: PropTypes.object,
}

export default SearchFormRender
