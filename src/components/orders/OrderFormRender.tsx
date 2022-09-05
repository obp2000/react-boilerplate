import {FormEvent} from 'react'
import {Field} from 'react-final-form'
import type {FormRenderProps} from 'react-final-form'
import {Form, Row, Col, Table} from 'reactstrap'
import {FieldArray} from 'react-final-form-arrays'
// import type {FieldArrayRenderProps} from 'react-final-form-arrays'
import Input from '../Shared/Input'
import FloatingFormGroup from '../Shared/FloatingFormGroup'
import OrderItem from '../orderItems/OrderItem'
// import Gift from './Gift'
import Header from '../objectForm/Header'
import SelectFloatingFormGroup from '../Shared/SelectFloatingFormGroup'
import OrderItemsTotals from './OrderItemsTotals'
import Samples from './Samples'
import Postals from './Postals'
import OrderTotals from './OrderTotals'
import OrderItemsTableLabels from '../orderItems/tableLabels'
import GiftIfNeeded from './Gift'
import {useDropdown as useCustomerDropdownAttrs} from '../customers/hooks'
import DropdownListFormGroup from '../dropdownList/DropdownListFormGroup'
import {
  Order,
  OrderOptions,
  CommonConsts
} from '../../../interfaces'

type Props = FormRenderProps & {
  object: Order
  options: OrderOptions
  commonConsts: CommonConsts
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const OrderFormRender = (props: Props): JSX.Element => {
  // console.log({props})
  const options = {options: props.options}
  // const orderItemOptions = orderOrderItemOptions(props.options)
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
        component={DropdownListFormGroup}
        {...useCustomerDropdownAttrs(props.options?.customer.children)}
        commonConsts={props.commonConsts}
        {...options}
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
        <OrderItemsTableLabels {...props} />
      </thead>
      <tbody>
        <FieldArray name="order_items">
          {({fields}) => <>
            {fields.map((
              orderItemName: string,
              index: number): JSX.Element => <OrderItem key={index} {...{
                  orderItemName,
                  index,
                  fields,
                  options: props.options,
                  commonConsts: props.commonConsts,
                }} />
            )}
            {Number(fields?.length) > 1 && <OrderItemsTotals {...props} />}
          </>
          }
        </FieldArray>
      </tbody>
      <tfoot>
        <GiftIfNeeded {...props} />
        {/* <ConditionGt when="order_items_amount" gt={0}>*/}
        <>
          <Samples {...props} />
          <Postals {...props} />
          <OrderTotals />
        </>
        {/* </ConditionGt>*/}
      </tfoot>
    </Table>
  </Form>
}

export default OrderFormRender
