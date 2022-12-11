'use client'

import Input from '@/formInput/Input'
import { CommonConstsType } from '@/interfaces/commonConsts'
import SubmitButton from '@/submitButton/SubmitButton'
import { Field, Form } from 'react-final-form'
import FormBootstrap from '@/client/FormBootstrap'
import { useForm } from './hooks'

export default function SearchForm({ commonConsts }: CommonConstsType) {
  return <Form {...useForm()}>
    {(props) => <FormBootstrap onSubmit={props.handleSubmit}
      className='d-flex mt-1 inline'>
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
    </FormBootstrap>}
  </Form>
}
