import React from 'react'
import { Field } from 'react-final-form'
import { Form, Row, Col } from 'reactstrap'
import FloatingFormGroup from '../formInput/FloatingFormGroup'
import Header from '../objectForm/Header'
import Input from '../formInput/Input'
import { useDropdown as useCityDropdownAttrs } from '../cities/hooks'
import DropdownListFormGroup from '../dropdownList/DropdownListFormGroup'
import type { CustomerFormProps } from '../../../interfaces/customers'

const CustomerFormRender = (props: CustomerFormProps) => <Form
  onSubmit={props.handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
  <Header {...props} />
  <Field name="id" hidden component={Input} />
  <Row>
    <Col sm={3}>
      <Field name="nick" component={FloatingFormGroup} />
    </Col>
    <Col sm={6}>
      <Field name="name" component={FloatingFormGroup} />
    </Col>
    <Col sm={6}>
      <Field
        name="city"
        component={DropdownListFormGroup}
        {...useCityDropdownAttrs()}
      />
    </Col>
    <Col sm={8}>
      <Field name="address" component={FloatingFormGroup} />
    </Col>
  </Row>
</Form>

export default CustomerFormRender
