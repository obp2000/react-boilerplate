import Input from '@/formInput/Input'
import { Field } from 'react-final-form'
import { useFieldArray } from 'react-final-form-arrays'
import OrderItemsTotalText from './OrderItemsTotalText'
// import type { OrderOptionsType } from '@/@/interfaces/orders'

export default function OrderItemsTotals() {
  const { fields } = useFieldArray('order_items')
  if (Number(fields?.length) <= 1) { return null }
  return <tr>
    <td colSpan={3}>
      <OrderItemsTotalText />
    </td>
    <td>
      <Field name="order_items_amount" disabled component={Input} />
    </td>
    <td>
      <Field name="order_items_cost" disabled component={Input} />
    </td>
    <td>
      <Field name="order_items_weight" disabled component={Input} />
    </td>
  </tr>
}
