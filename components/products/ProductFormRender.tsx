import { FC } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { Col, Form, Row } from 'reactstrap'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import Input from '@/formInput/Input'
import SwitchFormGroup from '@/formInput/SwitchFormGroup'
import Header from '@/objectForm/Header'
import SelectFloatingFormGroup from '@/selectField/SelectFloatingFormGroup'
import ProductImage from './ProductImage'

const PropductFormRender: FC<FormRenderProps> = (props) => <Form
  onSubmit={props.handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
  <Header {...props} />
  <Field name="id" hidden component={Input} />
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
              name='product_type' dataKey='id' textField='name' />
          </Col>
          <Col sm={2}>
            <SelectFloatingFormGroup
              name='threads' dataKey='value' textField='display_name' />
          </Col>
          <Col sm={2}>
            <Field
              name="fleece" type="checkbox" component={SwitchFormGroup} />
          </Col>
          <Col sm={2}>
            <SelectFloatingFormGroup
              name='contents' dataKey='value' textField='display_name' />
          </Col>
          <Col sm={8}>
            <Field name="name" component={FloatingFormGroup} />
          </Col>
          <Col sm={3}>
            <Field name="image" component={FloatingFormGroup} />
          </Col>
        </Row>
      </Col>
    </fieldset>
    {/* </Row>*/}
    <fieldset className="row my-2 border shadow">
      <Col sm={2}>
        <Field name="dollar_price" step='0.1' component={FloatingFormGroup}
        />
      </Col>
      <Col sm={2}>
        <Field name="dollar_rate" component={FloatingFormGroup}
        />
      </Col>
      <Col sm={2}>
        <Field name="width" component={FloatingFormGroup}
        />
      </Col>
      <Col sm={2}>
        <Field name="density" component={FloatingFormGroup}
        />
      </Col>
      <Col sm={2}>
        <Field name="price" component={FloatingFormGroup} />
      </Col>
      <Col sm={9}>
        <Field name="prices" disabled component={FloatingFormGroup}
        />
      </Col>
    </fieldset>
    <fieldset className="row my-2 py-1 border shadow">
      <Col sm={2}>
        <Field name="weight_for_count" component={FloatingFormGroup}
        />
      </Col>
      <Col sm={2}>
        <Field
          name="length_for_count" step="0.1" component={FloatingFormGroup} />
      </Col>
      <Col sm={3}>
        <Field
          name="density_for_count" disabled component={FloatingFormGroup} />
      </Col>
    </fieldset>
    <fieldset className="row my-2 py-2 border shadow">
      <Col sm={2}>
        <Field name='weight' step='0.1' component={FloatingFormGroup} />
      </Col>
      <Col sm={2}>
        <Field name="meters_in_roll" disabled component={FloatingFormGroup} />
      </Col>
    </fieldset>
    <fieldset className="row my-2 border shadow">
      <Col sm={2}>
        <Field name="price_pre" component={FloatingFormGroup} />
      </Col>
      <Col sm={2}>
        <Field name="width_shop" component={FloatingFormGroup} />
      </Col>
      <Col sm={2}>
        <Field name="density_shop" component={FloatingFormGroup} />
      </Col>
    </fieldset>
  </Row>
</Form>

export default PropductFormRender
