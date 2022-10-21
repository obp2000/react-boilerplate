import { FC, useContext } from 'react'
import type { FormRenderProps } from 'react-final-form'
import { Field } from 'react-final-form'
import { Form } from 'reactstrap'
import Input from '../formInput/Input'
import { OptionsContext } from '../layout/Layout'
import SubmitButton from '../submitButton/SubmitButton'

const SearchFormRender: FC<FormRenderProps> = (props) => {
  const { commonConsts } = useContext(OptionsContext)
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
    <SubmitButton
      text={commonConsts?.search}
      className='btn-outline-light'
      {...props}
    />
  </Form>
}

export default SearchFormRender
