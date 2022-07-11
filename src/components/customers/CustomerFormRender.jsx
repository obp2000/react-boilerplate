import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
// import {useOutletContext} from 'react-router-dom'
import {Form, Row, Col} from 'reactstrap'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import FormHeader from '../Shared/FormHeader'
import Input from '../Shared/Input'
// import Errors from '../Shared/Errors'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'
import CityName from './CityName'

const CustomerFormRender = ({
  handleSubmit,
  initialValues,
  ...props
}) => {
  const renderCity = ({item}) => <CityName {...item} />
  return <Form onSubmit={handleSubmit}
    className="shadow p-3 mb-5 bg-body rounded">
    <FormHeader {...initialValues} {...props} />
    <Field name="id" hidden component={Input} />
    <Row>
      <Col sm={3}>
        <Field name="nick" component={FloatingFormGroup} />
      </Col>
      <Col sm={6}>
        <Field name="name" component={FloatingFormGroup} />
      </Col>
      <Col sm={6}>
        <Field name="city"
          component={DropdownListFormGroup}
          textField={({city, pindex}) => [city, pindex]}
          searchPath='/cities/'
          renderValue={renderCity}
          renderListItem={renderCity}
        />
      </Col>
      <Col sm={8}>
        <Field name="address" component={FloatingFormGroup} />
      </Col>
    </Row>
  </Form>
}

CustomerFormRender.propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  props: PropTypes.object,
}

export default CustomerFormRender
