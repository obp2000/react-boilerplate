import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form, Row, Col} from 'reactstrap'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import FormHeader from '../Shared/FormHeader'
import Input from '../Shared/Input'
// import Errors from '../Shared/Errors'
import cityName from '../cities/CityName'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'
import {cityLabels} from '../redux/Cities'

const CustomerFormRender = ({options, commonConsts, ...props}) => {
  const cityFieldLabels = cityLabels(options?.city?.children)
  // console.log("form ", props.form.mutators)
  // props.form.change('name', 'testName')
  return <Form onSubmit={props.handleSubmit}
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
          dataKey='id'
          textField={(item) => cityName(item, cityFieldLabels)}
          search_path='/cities/'
          label_col_size={2}
          renderListItem={({item}) => cityName(item, cityFieldLabels)}
          renderValue={({item}) => cityName(item, cityFieldLabels)}
          {...{options}}
          not_found={commonConsts?.not_found}
        />
      </Col>
      <Col sm={8}>
        <Field name="address"
          {...{options}}
          component={FloatingFormGroup} />
      </Col>
      {/*      <Button onClick={() => props.form.mutators.mutator1(1, 2, 3)}>
        Test
      </Button>*/}
    </Row>
    {/*    <FormSpy
      subscription={{ values: {name: true}}}
      onChange={(props) => {
        // setFieldData("firstName", {
        //   warning: values.firstName ? undefined : "Recommended"
        // });
        // setFieldData("lastName", {
        //   warning: values.lastName ? undefined : "Recommended"
        // });
        console.log('spy props', props)
      }
    }
    />*/}
  </Form>
}

CustomerFormRender.propTypes = {
  options: PropTypes.object,
  commonConsts: PropTypes.object,
  handleSubmit: PropTypes.func,
}

export default CustomerFormRender
