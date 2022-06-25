import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form, Row, Col} from 'reactstrap'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import FormHeader from '../Shared/FormHeader'
import Input from '../Shared/Input'
// import Errors from '../Shared/Errors'
import cityName from '../cities/name'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'
import {cityLabels} from '../cities/options'
import {customerCityOptions} from '../customers/options'

const CustomerFormRender = ({options, commonConsts, ...props}) =>
  <Form onSubmit={props.handleSubmit}
    className="shadow p-3 mb-5 bg-body rounded">
    <FormHeader {...{options}} {...props} {...commonConsts} />
    <Field name="id"
      {...{options}}
      hidden
      component={Input} />
    <Row>
      <Col sm={3}>
        <Field name="nick"
          {...{options}}
          component={FloatingFormGroup} />
      </Col>
      <Col sm={6}>
        <Field name="name"
          {...{options}}
          component={FloatingFormGroup} />
      </Col>
      <Col sm={6}>
        <Field name="city"
          component={DropdownListFormGroup}
          textField={({city, pindex}) => [city, pindex]}
          searchPath='/cities/'
          renderValue={({item}) =>
            cityName(item, cityLabels(customerCityOptions(options)))}
          renderListItem={({item}) =>
            cityName(item, cityLabels(customerCityOptions(options)))}
          {...{options}}
          notFound={commonConsts?.not_found}
        />
      </Col>
      <Col sm={8}>
        <Field name="address"
          {...{options}}
          component={FloatingFormGroup} />
      </Col>
    </Row>
  </Form>

CustomerFormRender.propTypes = {
  options: PropTypes.object,
  commonConsts: PropTypes.object,
  handleSubmit: PropTypes.func,
}

export default CustomerFormRender
