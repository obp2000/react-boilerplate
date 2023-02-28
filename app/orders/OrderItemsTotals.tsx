import type { Translation } from '@/app/i18n/dictionaries'
import consts from './consts.json'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { orderItemsAmount, orderItemsCost, orderItemsWeight } from './calculator'

export default function OrderItemsTotals({
  labels,
  units,
  orderItemsValues,
}: {
  labels: Translation['order']
  units: Translation['units']
}) {
  return <tr className="border-b border-gray-200 hover:bg-gray-100" >
    <td colSpan={3}>
      <span>
        {labels.order_items_cost}
{/*        <ConditionGte when="order_items_cost" gte={consts.SUM_FOR_GIFT}>
          <span className='text-red-500'> - {labels.need_gift}</span>
        </ConditionGte>*/}
        {(orderItemsCost(orderItemsValues) >= consts.SUM_FOR_GIFT) &&
          <span className='text-red-500'> - {labels.need_gift}</span> }
      </span>
    </td>
    <td>
      <TextField
        id='order_items_amount'
        size="small"
        disabled
        value={orderItemsAmount(orderItemsValues)}
        InputProps={{
          endAdornment: <InputAdornment position="end">{units.meter_short}</InputAdornment>,
        }}
      />
    </td>
    <td>
      <TextField
        id='order_items_cost'
        size="small"
        disabled
        value={orderItemsCost(orderItemsValues)}
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
      />
    </td>
    <td>
      <TextField
        id='order_items_weight'
        size="small"
        disabled
        value={orderItemsWeight(orderItemsValues)}
        InputProps={{
          endAdornment: <InputAdornment position="end">{units.gram_short}</InputAdornment>,
        }}
      />
    </td>
  </tr>
}


      // {/*      <Field name="order_items_amount"
      //   label={labels.order_items_amount}
      //   type="number"
      //   disabled
      //   component={Input}
      //   className='w-20 text-right'
      // />*/}

      // {/*      <Field name="order_items_cost"
      //   label={labels.order_items_cost}
      //   type="number"
      //   disabled
      //   component={Input}
      //   className='w-20 text-right'
      // />*/}

      // {/*      <Field name="order_items_weight"
      //   label={labels.order_items_weight}
      //   type="number"
      //   disabled
      //   component={Input}
      //   className='w-20 text-right'
      // />*/}
