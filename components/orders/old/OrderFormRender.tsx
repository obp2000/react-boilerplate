'use client'

import { useContext } from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { Col, Row, Table } from 'reactstrap'
import type { CommonConstsType } from '@/interfaces/commonConsts'
import type { OrderOptionsType } from '@/interfaces/orders'
import { useDropdown as useCustomerDropdownAttrs } from '@/app/customers/hooks'
import DropdownListFormGroup from '@/dropdownList/DropdownListFormGroup'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import { MainContext } from '@/services/context'
import OrderItems from '@/orderItems/OrderItems'
import OrderItemsTableLabels from '@/orderItems/TableLabels'
import SelectFloatingFormGroup from '@/selectField/SelectFloatingFormGroup'
import GiftIfNeeded from './Gift'
import OrderItemsTotals from './OrderItemsTotals'
import OrderTotals from './OrderTotals'
import Postals from './Postals'
import Samples from './Samples'
import Layout from '@/objectForm/Layout'

export default function OrderFormRender(props: FormRenderProps) {
  const { options: orderOptions, commonConsts } =
    useContext(MainContext) as OrderOptionsType & CommonConstsType
  const options = orderOptions?.order_items?.child?.children
  return <Layout {...props}>
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
        <MainContext.Provider value={{ options, commonConsts }}>
          <OrderItemsTableLabels />
        </MainContext.Provider>
      </thead>
      <tbody>
        <MainContext.Provider value={{ options, commonConsts }}>
          <FieldArray name="order_items" component={OrderItems} />
        </MainContext.Provider>
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
  </Layout>
}
