import PropTypes from 'prop-types'
import React from 'react'
import {Field} from 'react-final-form'
import {Form, Row, Col, Table} from 'reactstrap'
import {FieldArray} from 'react-final-form-arrays'
import {useOutletContext} from 'react-router-dom'
import Input from '../Shared/Input'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import OrderItems from '../orderItems/OrderItems'
import Gift from './Gift'
import FormHeader from '../Shared/FormHeader'
import SelectFloatingFormGroup from '../Shared/SelectFloatingFormGroup'
import customersConfig from '../customers/config'
import DropdownListFormGroup from '../Shared/DropdownListFormGroup'
import {CustomerName} from './CustomerName'
import OrderItemsTotals from './OrderItemsTotals'
import {ConditionGte, ConditionGt} from '../Shared/FormConditions'
import Samples from './Samples'
import Postals from './Postals'
import OrderTotals from './OrderTotals'
import orderItemsConfig from '../orderItems/config'
import OrderItemsTableFieldNames from '../orderItems/OrderItemsTableFieldNames'
import AddOrderItemButton from '../orderItems/AddOrderItemButton'

const OrderFormRender = ({
  handleSubmit,
  initialValues,
  ...props
}) => {
  const {options} = useOutletContext()
  const renderCustomer = ({item}) => <CustomerName {...item} />
  return <Form onSubmit={handleSubmit}
    className="shadow p-3 mb-5 bg-body rounded">
    <FormHeader {...initialValues} {...props} />
    <Field name="id"
      hidden
      component={Input} />
    <Row>
      <Field name="customer"
        component={DropdownListFormGroup}
        textField={({nick, name, city, address}) =>
          [nick, name, city?.pindex, city?.city, address]}
        searchPath={customersConfig.searchUrl}
        renderValue={renderCustomer}
        renderListItem={renderCustomer}
      />
    </Row>
    <Row>
      <Col sm={2}>
        <SelectFloatingFormGroup
          name="delivery_type"
          dataKey='value'
          textField='display_name' />
      </Col>
      <Col sm={6}>
        <Field name="address"
          component={FloatingFormGroup}/>
      </Col>
    </Row>
    <Table size="sm" responsive bordered hover>
      <thead>
        <tr>
          <th scope="col">№</th>
          <OrderItemsTableFieldNames />
          <th scope='col'>
            <AddOrderItemButton {...props.form.mutators} />
          </th>
        </tr>
      </thead>
      <tbody>
        <FieldArray name="order_items"
          // initialValue={orderItemsConfig.formInitialOrderItems(object.order_items)}
          component={OrderItems} />
      </tbody>
      <tfoot>
        {/*<ConditionGt when="order_items_amount" gt={0}>*/}
          {/*<OrderItemsTotals />*/}
        {/*</ConditionGt>*/}
        <ConditionGte
            when="order_items_cost"
            gte={options?.Consts.SUM_FOR_GIFT}>
          <Gift />
        </ConditionGte>
        {/*<ConditionGt when="order_items_amount" gt={0}>*/}
          <>
            <Samples />
            <Postals {...props} />
            <OrderTotals />
          </>
        {/*</ConditionGt>*/}
      </tfoot>
    </Table>
  </Form>
}

OrderFormRender.propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  props: PropTypes.object,
}

export default OrderFormRender
