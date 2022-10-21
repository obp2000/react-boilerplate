import { FC, useContext } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { Col, Form, Row, Table } from 'reactstrap'
import type { CommonConstsType } from '../../../interfaces/commonConsts'
import type { OrderOptionsType } from '../../../interfaces/orders'
import { useDropdown as useCustomerDropdownAttrs } from '../customers/hooks'
import DropdownListFormGroup from '../dropdownList/DropdownListFormGroup'
import FloatingFormGroup from '../formInput/FloatingFormGroup'
import Input from '../formInput/Input'
import { OptionsContext } from '../layout/Layout'
import Header from '../objectForm/Header'
import OrderItems from '../orderItems/OrderItems'
import OrderItemsTableLabels from '../orderItems/TableLabels'
import SelectFloatingFormGroup from '../selectField/SelectFloatingFormGroup'
import GiftIfNeeded from './Gift'
import OrderItemsTotals from './OrderItemsTotals'
import OrderTotals from './OrderTotals'
import Postals from './Postals'
import Samples from './Samples'

const OrderFormRender: FC<FormRenderProps> = (props) => {
  const { options: orderOptions, commonConsts } =
    useContext(OptionsContext) as OrderOptionsType & CommonConstsType
  const options = orderOptions?.order_items?.child?.children
  return <Form onSubmit={props.handleSubmit}
    className="shadow p-3 mb-5 bg-body rounded">
    <Header {...props} />
    <Field name="id" hidden component={Input} />
    <Row>
      <Field
        name="customer"
        component={DropdownListFormGroup}
        {...useCustomerDropdownAttrs()}
      />
    </Row>
    <Row>
      <Col sm={2}>
        <SelectFloatingFormGroup
          name="delivery_type" dataKey='value' textField='display_name' />
      </Col>
      <Col sm={6}>
        <Field name="address" component={FloatingFormGroup} />
      </Col>
    </Row>
    <Table size="sm" responsive bordered hover>
      <thead>
        <OptionsContext.Provider value={{ options, commonConsts }}>
          <OrderItemsTableLabels />
        </OptionsContext.Provider>
      </thead>
      <tbody>
        <OptionsContext.Provider value={{ options, commonConsts }}>
          <FieldArray name="order_items" component={OrderItems} />
          {/*            {({ fields }) => fields.map((orderItemName, index) => <OrderItem
              key={index} {...{ orderItemName, index }} />)}
          </FieldArray>*/}
        </OptionsContext.Provider>
        <OrderItemsTotals />
      </tbody>
      <tfoot>
        <GiftIfNeeded />
        <>
          <Samples />
          <Postals />
          <OrderTotals />
        </>
      </tfoot>
    </Table>
  </Form>
}

export default OrderFormRender
