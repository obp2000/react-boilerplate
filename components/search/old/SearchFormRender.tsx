'use client'

import type { FormRenderProps } from 'react-final-form'
import { Field } from 'react-final-form'
import { Form } from 'reactstrap'
import Input from '@/formInput/Input'
// import { MainContext } from '@/services/context'
import SubmitButton from '@/submitButton/SubmitButton'
import { useContext } from 'react'
import { MainContext } from '@/services/context'

export default function SearchFormRender(
  props: FormRenderProps
) {
  const { commonConsts } = useContext(MainContext)
  return <Form onSubmit={props.handleSubmit}
    inline='true'
    className='d-flex mt-1'>
    <Field
      name='term'
      type="search"
      placeholder={commonConsts?.search}
      className="me-2"
      component={Input}
    />
    <SubmitButton className='btn-outline-light' {...props}>
      {commonConsts?.search}
    </SubmitButton>
  </Form>
}
