import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form} from 'reactstrap'
import Input from '../Shared/Input'
import SubmitButton from '../Shared/SubmitButton'

const SearchFormRender = (props) =>
  <Form onSubmit={props.handleSubmit} inline className="d-flex mt-2">
    <Field name='term'
      type="search"
      placeholder={props.search}
      className="me-2"
      component={Input} />
    {/*            <Button type="submit" color='primary'
                          className='btn-outline-light'
                    // disabled={submitting || invalid}
                    >
                {searchLabel}
            </Button>*/}
    <SubmitButton text={props.search}
      className='btn-outline-light'
      {...props} />
  </Form>

SearchFormRender.propTypes = {
  handleSubmit: PropTypes.func,
  search: PropTypes.string,
}

export default SearchFormRender
