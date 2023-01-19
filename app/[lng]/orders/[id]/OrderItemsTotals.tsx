import Input from '@/formInput/Input'
import { ConditionGte } from '@/objectForm/FormConditions'
import { Field } from 'react-final-form'
import consts from './consts.json'
import options from './options.json'

export default function OrderItemsTotals() {
  return <tr className="border-b border-gray-200 hover:bg-gray-100" >
    <td colSpan={3}>
      <span>
        {options.order_items_cost.label}
        <ConditionGte when="order_items_cost" gte={consts.SUM_FOR_GIFT}>
          <span className='text-red-500'> - {options?.need_gift.label}</span>
        </ConditionGte>
      </span>
    </td>
    <td>
      <Field name="order_items_amount" disabled component={Input} className='w-20 text-right' />
    </td>
    <td>
      <Field name="order_items_cost" disabled component={Input} className='w-20 text-right' />
    </td>
    <td>
      <Field name="order_items_weight" disabled component={Input} className='w-20 text-right' />
    </td>
  </tr>
}
