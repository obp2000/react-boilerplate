import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form, Row, Col, Table} from 'reactstrap'
import {FieldArray} from 'react-final-form-arrays'
import Input from '../Shared/Input'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import OrderItems from '../orderItems/OrderItems'
// import Gift from './Gift'
import Header from '../objectForm/Header'
import SelectFloatingFormGroup from '../Shared/SelectFloatingFormGroup'
import OrderItemsTotals from './OrderItemsTotals'
// import {ConditionGte, ConditionGt} from '../Shared/FormConditions'
import Samples from './Samples'
import Postals from './Postals'
import OrderTotals from './OrderTotals'
import {useCustomerDropdown} from './hooks'
import OrderItemFieldLabels from '../orderItems/FieldLabels'
import AddOrderItemButton from '../orderItems/AddOrderItemButton'
import {GiftIfNeeded} from './Gift'

const OrderFormRender = (props) => {
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
      <Field
        name="customer"
        {...useCustomerDropdown(props)}
      />
    </Row>
    <Row>
      <Col sm={2}>
        <SelectFloatingFormGroup
          name="delivery_type"
          dataKey='value'
          textField='display_name'
          {...options}
        />
      </Col>
      <Col sm={6}>
        <Field
          name="address"
          component={FloatingFormGroup}
          {...options}
        />
      </Col>
    </Row>
    <Table size="sm" responsive bordered hover>
      <thead>
        <tr>
          <th scope="col">№</th>
          <OrderItemFieldLabels {...props} />
          <th scope='col'>
            <AddOrderItemButton {...props} />
          </th>
        </tr>
      </thead>
      <tbody>
        <FieldArray
          name="order_items"
          component={OrderItems}
          {...options}
          commonConsts={props.commonConsts}
        />
      </tbody>
      <tfoot>
        <GiftIfNeeded {...props} />
        {/* <ConditionGt when="order_items_amount" gt={0}>*/}
        <>
          <Samples />
          <Postals {...props} />
          <OrderTotals />
        </>
        {/* </ConditionGt>*/}
      </tfoot>
    </Table>
  </Form>
}

OrderFormRender.propTypes = {
  handleSubmit: PropTypes.func,
  props: PropTypes.object,
}

export default OrderFormRender
