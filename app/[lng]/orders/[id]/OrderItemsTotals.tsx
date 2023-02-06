import { Translation } from '@/app/i18n/dictionaries'
import Input from '@/formInput/Input'
import { ConditionGte } from '@/objectForm/FormConditions'
import { Field } from 'react-final-form'
import consts from './consts.json'

export default function OrderItemsTotals({ labels }: { labels: Translation['order'] }) {
  return <tr className="border-b border-gray-200 hover:bg-gray-100" >
    <td colSpan={3}>
      <span>
        {labels.order_items_cost}
        <ConditionGte when="order_items_cost" gte={consts.SUM_FOR_GIFT}>
          <span className='text-red-500'> - {labels.need_gift}</span>
        </ConditionGte>
      </span>
    </td>
    <td>
      <Field name="order_items_amount"
        label={labels.order_items_amount}
        type="number"
        disabled
        component={Input}
        className='w-20 text-right'
      />
    </td>
    <td>
      <Field name="order_items_cost"
        label={labels.order_items_cost}
        type="number"
        disabled
        component={Input}
        className='w-20 text-right'
      />
    </td>
    <td>
      <Field name="order_items_weight"
        label={labels.order_items_weight}
        type="number"
        disabled
        component={Input}
        className='w-20 text-right'
      />
    </td>
  </tr>
}
