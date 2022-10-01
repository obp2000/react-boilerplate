import React from 'react'
import { Field } from 'react-final-form'
import type { FormRenderProps } from 'react-final-form'
import { Form, Row, Col, Table } from 'reactstrap'
import { FieldArray } from 'react-final-form-arrays'
// import type { FieldArrayRenderProps } from 'react-final-form-arrays'
import Input from '../formInput/Input'
import FloatingFormGroup from '../formInput/FloatingFormGroup'
import OrderItem from '../orderItems/OrderItem'
import Header from '../objectForm/Header'
import SelectFloatingFormGroup from '../selectField/SelectFloatingFormGroup'
import OrderItemsTotals from './OrderItemsTotals'
import Samples from './Samples'
import Postals from './Postals'
import OrderTotals from './OrderTotals'
import OrderItemsTableLabels from '../orderItems/TableLabels'
import GiftIfNeeded from './Gift'
import { useDropdown as useCustomerDropdownAttrs } from '../customers/hooks'
import DropdownListFormGroup from '../dropdownList/DropdownListFormGroup'
import { OrderWithOptions, CommonConstsType } from '../../../interfaces'

type Props = FormRenderProps & CommonConstsType & OrderWithOptions

const OrderFormRender = (props: Props): JSX.Element => {
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
      <Field
        name="customer"
        component={DropdownListFormGroup}
        {...useCustomerDropdownAttrs(props.options?.customer?.children)}
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
{/*      <thead>
        <OrderItemsTableLabels {...props} />
      </thead>*/}
      {/*<tbody>*/}
      <FieldArray name="order_items">
        {({ fields }) => <>
          <thead>
            <OrderItemsTableLabels {...props} {...{fields}} meta={{}} />
          </thead>
          <tbody>
            {fields.map((
              orderItemName: string,
              index: number): JSX.Element => <OrderItem key={index} {...{
                orderItemName,
                index,
                fields,
                options: props.options,
                commonConsts: props.commonConsts,
                meta: {}
              }} />
            )}
            {Number(fields?.length) > 1 && <OrderItemsTotals {...props} />}
          </tbody>
        </>
        }
      </FieldArray>
      {/*</tbody>*/}
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
