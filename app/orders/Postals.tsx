import Button from '@/app/client/Button'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import CalculateIcon from '@mui/icons-material/Calculate'
import Tooltip from '@/app/client/Tooltip'
import type { Translation } from '@/app/i18n/dictionaries'
import { Controller } from "react-hook-form"
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import consts from './consts.json'
import { orderItemsCost, orderItemsWeight, postCostCount } from './calculator'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export default function Postals({
  count,
  labels,
  units,
  busy,
  control,
  customer,
  orderItemsValues,
  postCost,
  packet,
  setValue,
}: {
  count: string,
  labels: Translation['order']
  units: Translation['units']
  busy: boolean
}) {
  // const { mutators } = useForm()
  // const { values: { customer, total_weight } } = useFormState()
  return <tr className="border-b border-gray-200 hover:bg-gray-100">
    <td />
    <td className='text-sm'>
      <div className='grid gap-1 mb-6 md:grid-cols-7 pt-4' >
        <Controller name="post_cost"
          control={control}
          render={({ field }) => <TextField {...field}
            id="post_cost"
            label={labels.post_cost}
            type="number"
            step={1}
            variant="outlined"
            size="small"
            disabled={busy}
            InputProps={{
              endAdornment: <InputAdornment position="end">₽</InputAdornment>,
            }}
          />}
        />
        <div className='pt-3 pl-2'>
          <AddIcon size={22} />
        </div>
        <Controller name="packet"
          control={control}
          render={({ field }) => <FormControl size='small' fullWidth>
            <InputLabel id="packet-label">{labels.packet}</InputLabel>
            <Select
              {...field}
              labelId="packet-label"
              id="packet"
              label={labels.packet}
              disabled={busy}
            >
              <MenuItem value=""><em>------</em></MenuItem>
              {labels.packetChoices.map(({ value, display_name }, key) => <MenuItem key={key} value={value}>
                {display_name}
              </MenuItem>)}
            </Select>
          </FormControl>}
        />
        <div className='pt-3 pl-2'>
          <DragHandleIcon size={22} />
        </div>
        <TextField
          id="post_cost_with_packet"
          label={labels.post_cost_with_packet}
          type="number"
          variant="outlined"
          size="small"
          disabled
          value={postCost + packet}
          InputProps={{
            endAdornment: <InputAdornment position="end">₽</InputAdornment>,
          }}
        />
        <div className='pt-3 pl-2'>
          <RemoveIcon size={22} />
        </div>
        <TextField
          id="post_discount"
          label={labels.post_discount}
          type="number"
          variant="outlined"
          size="small"
          disabled
          value={orderItemsCost(orderItemsValues) >= consts.SUM_FOR_POST_DISCOUNT
                  ? ((postCost + packet) * consts.POST_DISCOUNT_PERCENT / 100).toFixed(2)
                  : 0}
          InputProps={{
            endAdornment: <InputAdornment position="end">₽</InputAdornment>,
          }}
        />
      </div>
    </td>
    <td />
    <td>
      {customer?.city?.pindex && <Tooltip title={count} >
        <CalculateIcon
          size={20}
          aria-labelledby={count}
          onClick={() => busy
            ? null
            : postCostCount({ pindex: customer.city.pindex, weight: orderItemsWeight(orderItemsValues), setValue})}
          cursor='pointer' />
      </Tooltip>}
    </td>
    <td>
      <TextField
        id="total_postals"
        label={labels.total_postals}
        type="number"
        variant="outlined"
        size="small"
        disabled
        value={orderItemsCost(orderItemsValues) >= consts.SUM_FOR_POST_DISCOUNT
                  ? (postCost + packet - (postCost + packet) * consts.POST_DISCOUNT_PERCENT / 100).toFixed(2)
                  : postCost + packet}
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
      />
    </td>
    <td>
      <TextField
        id="packet_weight"
        label={labels.packet_weight}
        type="number"
        variant="outlined"
        size="small"
        disabled
        value={consts.PACKET_WEIGHT}
        InputProps={{
          endAdornment: <InputAdornment position="end">{units.gram_short}</InputAdornment>,
        }}
      />
    </td>
    <td />
  </tr>
}


        // <SelectFloatingFormGroup name="packet"
        //   label={labels.packet}
        //   dataKey='value'
        //   textField='display_name'
        //   choices={labels.packetChoices}
        //   disabled={busy}
        // />

      // <Field name="packet_weight"
      //   type="number"
      //   disabled
      //   component={Input}
      //   className='text-right w-20'
      // />
      // <Field name="total_postals"
      //   label={labels.total_postals}
      //   type="number"
      //   disabled
      //   component={Input}
      //   className='text-right w-20'
      // />

        // <Field name="post_discount"
        //   label={labels.post_discount}
        //   type="number"
        //   disabled
        //   component={FloatingFormGroup}
        // />

        // <Field name="post_cost_with_packet"
        //   label={labels.post_cost_with_packet}
        //   type="number"
        //   disabled
        //   component={FloatingFormGroup}
        //   className='w-30'
        // />

        // <Field name="post_cost"
        //   label={labels.post_cost}
        //   type="number"
        //   step={1}
        //   component={FloatingFormGroup}
        //   disabled={busy}
        // />

      // <Button
      //   name='post_cost_button'
      //   size='sm'
      //   onClick={() => mutators.postCostCount()}
      //   disabled={!values?.customer?.city?.pindex || !values?.total_weight} >
      //   {count}
      // </Button>