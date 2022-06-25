import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form, Row, Col} from 'reactstrap'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import SelectFloatingFormGroup from '../Shared/SelectFloatingFormGroup'
import SwitchFormGroup from '../Shared/SwitchFormGroup'
import FormHeader from '../Shared/FormHeader'
import Input from '../Shared/Input'
// import { selectImageProps } from '../redux/Products'
// import { formatPrice, normalizePhone } from '../Shared/Formatters'
import blank from '../../assets/img/blank.png'

const ProductFormRender = ({options, commonConsts, ...props}) => {
  return <Form onSubmit={props.handleSubmit}
    className="shadow p-3 mb-5 bg-body rounded">
    <FormHeader {...{options}} {...props} {...commonConsts}/>
    <Field name="id"
      {...{options}}
      hidden
      component={Input} />
    <Row>
      {/* <Row>*/}
      <fieldset className="row my-2 py-2 border shadow">
        <Col sm={2}>
          <img alt={options?.image?.label}
            src={props.initialValues.image || String(blank)}
            className='img-thumbnail rounded float-start'
          />
        </Col>
        <Col sm={10}>
          <Row>
            <Col sm={2}>
              <SelectFloatingFormGroup
                name="product_type"
                dataKey='id'
                textField='name'
                {...{options}} />
            </Col>
            <Col sm={2}>
              <SelectFloatingFormGroup
                name="threads"
                dataKey='value'
                textField='display_name'
                {...{options}} />
            </Col>
            <Col sm={2}>
              <Field name="fleece"
                type='checkbox'
                {...{options}}
                component={SwitchFormGroup}/>
            </Col>
            <Col sm={2}>
              <SelectFloatingFormGroup
                name="contents"
                dataKey='value'
                textField='display_name'
                {...{options}} />
            </Col>
            <Col sm={8}>
              <Field name="name"
                {...{options}}
                component={FloatingFormGroup} />
            </Col>
            <Col sm={3}>
              <Field name="new_image"
                {...{options}}
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
            {...{options}}
            type='number'
            step='0.1'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="dollar_rate"
            {...{options}}
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="width"
            {...{options}}
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="density"
            {...{options}}
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="price"
            {...{options}}
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={9}>
          <Field name="prices"
            {...{options}}
            disabled
            component={FloatingFormGroup} />
        </Col>
      </fieldset>
      <fieldset className="row my-2 py-1 border shadow">
        <Col sm={2}>
          <Field name="weight_for_count"
            {...{options}}
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="length_for_count"
            {...{options}}
            type='number'
            step="0.1"
            component={FloatingFormGroup} />
        </Col>
        <Col sm={3}>
          <Field name="density_for_count"
            {...{options}}
            disabled
            component={FloatingFormGroup} />
        </Col>
      </fieldset>
      <fieldset className="row my-2 py-2 border shadow">
        <Col sm={2}>
          <Field name="weight"
            {...{options}}
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="meters_in_roll"
            {...{options}}
            disabled
            component={FloatingFormGroup} />
        </Col>
      </fieldset>
      <fieldset className="row my-2 border shadow">
        <Col sm={2}>
          <Field name="price_pre"
            {...{options}}
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="width_shop"
            {...{options}}
            type='number'
            component={FloatingFormGroup} />
        </Col>
        <Col sm={2}>
          <Field name="density_shop"
            {...{options}}
            type='number'
            component={FloatingFormGroup} />
        </Col>
      </fieldset>
    </Row>
  </Form>
}

ProductFormRender.propTypes = {
  options: PropTypes.object,
  commonConsts: PropTypes.object,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
}

export default ProductFormRender
