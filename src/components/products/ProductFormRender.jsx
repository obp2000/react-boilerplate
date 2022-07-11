import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {useOutletContext} from 'react-router-dom'
import {Form, Row, Col} from 'reactstrap'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import SelectFloatingFormGroup from '../Shared/SelectFloatingFormGroup'
import SwitchFormGroup from '../Shared/SwitchFormGroup'
import FormHeader from '../Shared/FormHeader'
import Input from '../Shared/Input'
// import { formatPrice, normalizePhone } from '../Shared/Formatters'
import blank from '../../assets/img/blank.png'

const ProductFormRender = ({handleSubmit, initialValues, ...props}) => {
  const {options} = useOutletContext()
  return <Form onSubmit={handleSubmit}
    className="shadow p-3 mb-5 bg-body rounded">
    <FormHeader {...initialValues} {...props} />
    <Field name="id" hidden component={Input} />
    <Row>
      {/* <Row>*/}
      <fieldset className="row my-2 py-2 border shadow">
        <Col sm={2}>
          <img alt={options?.image?.label}
            src={initialValues.image || String(blank)}
            className='img-thumbnail rounded float-start'
          />
        </Col>
        <Col sm={10}>
          <Row>
            <Col sm={2}>
              <SelectFloatingFormGroup
                name="product_type"
                dataKey='id'
                textField='name' />
            </Col>
            <Col sm={2}>
              <SelectFloatingFormGroup
                name="threads"
                dataKey='value'
                textField='display_name' />
            </Col>
            <Col sm={2}>
              <Field name="fleece"
                type='checkbox'
                component={SwitchFormGroup}/>
            </Col>
            <Col sm={2}>
              <SelectFloatingFormGroup
                name="contents"
                dataKey='value'
                textField='display_name' />
            </Col>
            <Col sm={8}>
              <Field name="name"
                component={FloatingFormGroup} />
            </Col>
            <Col sm={3}>
              <Field name="new_image"
                type='file'
                component={FloatingFormGroup} />
            </Col>
          </Row>
        </Col>
      </fieldset>
      {/* </Row>*/}
      <fieldset className="row my-2 border shadow">
        <Col sm={2}>
          <Field name="dollar_price"
            type='number'
            step='0.1'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="dollar_rate"
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="width"
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="density"
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="price"
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={9}>
          <Field name="prices"
            disabled
            component={FloatingFormGroup} />
        </Col>
      </fieldset>
      <fieldset className="row my-2 py-1 border shadow">
        <Col sm={2}>
          <Field name="weight_for_count"
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="length_for_count"
            type='number'
            step="0.1"
            component={FloatingFormGroup} />
        </Col>
        <Col sm={3}>
          <Field name="density_for_count"
            disabled
            component={FloatingFormGroup} />
        </Col>
      </fieldset>
      <fieldset className="row my-2 py-2 border shadow">
        <Col sm={2}>
          <Field name="weight"
            type='number'
            step='0.1'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="meters_in_roll"
            disabled
            component={FloatingFormGroup} />
        </Col>
      </fieldset>
      <fieldset className="row my-2 border shadow">
        <Col sm={2}>
          <Field name="price_pre"
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="width_shop"
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="density_shop"
            type='number'
            component={FloatingFormGroup} />
        </Col>
      </fieldset>
    </Row>
  </Form>
}

ProductFormRender.propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  props: PropTypes.object,
}

export default ProductFormRender
