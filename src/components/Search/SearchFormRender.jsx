import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form} from 'reactstrap'
import Input from '../Shared/Input'
import SubmitButton from '../submitButton/SubmitButton'

const SearchFormRender = ({
  label,
  ...props
}) => <Form onSubmit={props.handleSubmit} inline className="d-flex mt-1">
    <Field
      name='term'
      type="search"
      placeholder={label}
      className="me-2"
      component={Input}
    />
    <SubmitButton
      text={label}
      className='btn-outline-light'
      {...props}
    />
  </Form>

SearchFormRender.propTypes = {
  handleSubmit: PropTypes.func,
  label: PropTypes.string,
  props: PropTypes.object,
}

export default SearchFormRender
