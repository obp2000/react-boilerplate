'use client'

import { useDropdown as useCustomerDropdownAttrs } from '@/app/customers/hooks'
import Col from '@/client/Col'
import Row from '@/client/Row'
import Table from '@/client/Table'
import DropdownListFormGroup from '@/dropdownList/DropdownListFormGroup'
import FloatingFormGroup from '@/formInput/FloatingFormGroup'
import { CommonConstsType } from '@/interfaces/commonConsts'
import { AnyObjectOptionsType } from '@/interfaces/options'
import type { Order, OrderOptionsType } from '@/interfaces/orders'
import Layout from '@/objectForm/Layout'
import OrderItems from '@/orderItems/OrderItems'
import OrderItemsTableLabels from '@/orderItems/TableLabels'
import SelectFloatingFormGroup from '@/selectField/SelectFloatingFormGroup'
import { MainContext } from '@/options/context'
import { Field, Form } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import GiftIfNeeded from './Gift'
import { useForm } from './hooks'
import OrderItemsTotals from './OrderItemsTotals'
import OrderTotals from './OrderTotals'
import Postals from './Postals'
import Samples from './Samples'
import { AccessToken } from '@/interfaces/auth'
import { IdParam } from '@/interfaces/api'

type Props = IdParam & { initialValues: Order | {} } & CommonConstsType &
  AnyObjectOptionsType & Required<AccessToken>

export default function FormComp({ initialValues, ...props }: Props) {
  const { commonConsts, options } = props as OrderOptionsType & CommonConstsType
  const orderItemsContext =
    { commonConsts, options: options?.order_items?.child?.children }
  return <Form {...{ initialValues }} {...useForm(props)} >
    {(props) => <MainContext.Provider value={{ commonConsts, options }}>
      <Layout {...props}>
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
            <MainContext.Provider value={orderItemsContext}>
              <OrderItemsTableLabels />
            </MainContext.Provider>
          </thead>
          <tbody>
            <MainContext.Provider value={orderItemsContext}>
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
    </MainContext.Provider>}
  </Form>
}
