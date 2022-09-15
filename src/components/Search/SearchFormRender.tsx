import React from 'react'
import { Field } from 'react-final-form'
import type { FormRenderProps } from 'react-final-form'
import { Form } from 'reactstrap'
import Input from '../formInput/Input'
import SubmitButton from '../submitButton/SubmitButton'
import { CommonConsts } from '../../../interfaces'

type Props = FormRenderProps & {
  commonConsts?: CommonConsts
}

const SearchFormRender = (props: Props) => {
  return <Form onSubmit={props.handleSubmit}
    inline='true'
    className='d-flex mt-1'>
    <Field
      name='term'
      type="search"
      placeholder={props.commonConsts?.search}
      className="me-2"
      component={Input}
    />
    <SubmitButton
      text={props.commonConsts?.search}
      className='btn-outline-light'
      {...props}
    />
  </Form>
}

export default SearchFormRender
