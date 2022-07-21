import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form, Row, Col} from 'reactstrap'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import Header from '../objectForm/Header'
import Input from '../Shared/Input'
import DropdownListFormGroup from '../dropdownList/DropdownListFormGroup'
import {useCityDropdown} from './hooks'

const CustomerFormRender = ({
  handleSubmit,
  ...props
}) => {
  const cityDropdownAttrs = useCityDropdown()
  return <Form onSubmit={handleSubmit}
    className="shadow p-3 mb-5 bg-body rounded">
    <Header {...props} />
    <Field
      name="id"
      hidden
      component={Input}
    />
    <Row>
      <Col sm={3}>
        <Field
          name="nick"
          component={FloatingFormGroup}
        />
      </Col>
      <Col sm={6}>
        <Field
          name="name"
          component={FloatingFormGroup}
        />
      </Col>
      <Col sm={6}>
        <Field
          name="city"
          component={DropdownListFormGroup}
          {...cityDropdownAttrs}
        />
      </Col>
      <Col sm={8}>
        <Field
          name="address"
          component={FloatingFormGroup}
        />
      </Col>
    </Row>
  </Form>
}

CustomerFormRender.propTypes = {
  handleSubmit: PropTypes.func,
  props: PropTypes.object,
}

export default CustomerFormRender
