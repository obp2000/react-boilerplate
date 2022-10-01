import React from 'react'
import { Field } from 'react-final-form'
import type { FormRenderProps } from 'react-final-form'
import { Form, Row, Col } from 'reactstrap'
import FloatingFormGroup from '../formInput/FloatingFormGroup'
import SelectFloatingFormGroup from '../selectField/SelectFloatingFormGroup'
import SwitchFormGroup from '../formInput/SwitchFormGroup'
import Header from '../objectForm/Header'
import Input from '../formInput/Input'
import ProductImage from './ProductImage'
import {
  ProductWithOptions,
  CommonConstsType,
} from '../../../interfaces'

type Props = FormRenderProps & CommonConstsType & ProductWithOptions

const PropductFormRender = (props: Props): JSX.Element => {
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
      {/* <Row>*/}
      <fieldset className="row my-2 py-2 border shadow">
        <Col sm={2}>
          <ProductImage {...props} />
        </Col>
        <Col sm={10}>
          <Row>
            <Col sm={2}>
              <SelectFloatingFormGroup
                name="product_type"
                dataKey='id'
                textField='name'
                {...options}
              />
            </Col>
            <Col sm={2}>
              <SelectFloatingFormGroup
                name="threads"
                dataKey='value'
                textField='display_name'
                {...options}
              />
            </Col>
            <Col sm={2}>
              <Field
                name="fleece"
                type='checkbox'
                component={SwitchFormGroup}
                {...options}
              />
            </Col>
            <Col sm={2}>
              <SelectFloatingFormGroup
                name="contents"
                dataKey='value'
                textField='display_name'
                {...options}
              />
            </Col>
            <Col sm={8}>
              <Field
                name="name"
                component={FloatingFormGroup}
                {...options}
              />
            </Col>
            <Col sm={3}>
              <Field
                name="image"
                type='file'
                component={FloatingFormGroup}
                {...options}
              />
            </Col>
          </Row>
        </Col>
      </fieldset>
      {/* </Row>*/}
      <fieldset className="row my-2 border shadow">
        <Col sm={2}>
          <Field
            name="dollar_price"
            type='number'
            step='0.1'
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
        <Col sm={2}>
          <Field
            name="dollar_rate"
            type='number'
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
        <Col sm={2}>
          <Field
            name="width"
            type='number'
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
        <Col sm={2}>
          <Field
            name="density"
            type='number'
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
        <Col sm={2}>
          <Field
            name="price"
            type='number'
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
        <Col sm={9}>
          <Field
            name="prices"
            disabled
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
      </fieldset>
      <fieldset className="row my-2 py-1 border shadow">
        <Col sm={2}>
          <Field
            name="weight_for_count"
            type='number'
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
        <Col sm={2}>
          <Field
            name="length_for_count"
            type='number'
            step="0.1"
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
        <Col sm={3}>
          <Field
            name="density_for_count"
            disabled
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
      </fieldset>
      <fieldset className="row my-2 py-2 border shadow">
        <Col sm={2}>
          <Field
            name="weight"
            type='number'
            step='0.1'
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
        <Col sm={2}>
          <Field
            name="meters_in_roll"
            disabled
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
      </fieldset>
      <fieldset className="row my-2 border shadow">
        <Col sm={2}>
          <Field
            name="price_pre"
            type='number'
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
        <Col sm={2}>
          <Field
            name="width_shop"
            type='number'
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
        <Col sm={2}>
          <Field
            name="density_shop"
            type='number'
            component={FloatingFormGroup}
            {...options}
          />
        </Col>
      </fieldset>
    </Row>
  </Form>
}

export default PropductFormRender
