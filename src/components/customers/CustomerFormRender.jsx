import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form, Row, Col} from 'reactstrap'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import Header from '../objectForm/Header'
import Input from '../Shared/Input'
import {useCityDropdown} from './hooks'

const CustomerFormRender = (props) => {
  const options = {options: props.options}
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
          {...useCityDropdown(props)}
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

CustomerFormRender.propTypes = {
  props: PropTypes.object,
}

export default CustomerFormRender
