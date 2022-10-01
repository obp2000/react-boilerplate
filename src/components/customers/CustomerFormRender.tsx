import React from 'react'
import { Field } from 'react-final-form'
import type { FormRenderProps } from 'react-final-form'
import { Form, Row, Col } from 'reactstrap'
import FloatingFormGroup from '../formInput/FloatingFormGroup'
import Header from '../objectForm/Header'
import Input from '../formInput/Input'
import { useDropdown as useCityDropdownAttrs } from '../cities/hooks'
import DropdownListFormGroup from '../dropdownList/DropdownListFormGroup'
import type {
  CommonConstsType,
  CustomerWithOptions,
} from '../../../interfaces'

type Props = FormRenderProps & CommonConstsType & CustomerWithOptions

const CustomerFormRender = (props: Props): JSX.Element => {
  const options = { options: props.options }
  return <Form onSubmit={props.handleSubmit}
    className="shadow p-3 mb-5 bg-body rounded">
    <Header {...props} />
    <Field
      name="id"
      hidden
      component={Input}
      {...options}
    />
    <Row>
      <Col sm={3}>
        <Field
          name="nick"
          component={FloatingFormGroup}
          {...options}
        />
      </Col>
      <Col sm={6}>
        <Field
          name="name"
          component={FloatingFormGroup}
          {...options}
        />
      </Col>
      <Col sm={6}>
        <Field
          name="city"
          component={DropdownListFormGroup}
          {...useCityDropdownAttrs(props.options?.city.children)}
          commonConsts={props.commonConsts}
          {...options}
        />
      </Col>
      <Col sm={8}>
        <Field
          name="address"
          component={FloatingFormGroup}
          {...options}
        />
      </Col>
    </Row>
  </Form>
}

export default CustomerFormRender
