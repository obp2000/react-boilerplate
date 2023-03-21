import CalculateIcon from '@mui/icons-material/Calculate'
import Tooltip from '@/app/useClient/Tooltip'
import type { Translation } from '@/app/i18n/dictionaries'
import { type Control, Controller, type UseFormSetValue } from "react-hook-form"
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import consts from './consts.json'
import {
  orderItemsWeight,
  postCostCount,
  postCostWithPacket,
  postDiscount,
  totalPostals,
} from './calculator'
import type { Values, OrderObject as Order } from '@/interfaces/orders'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

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
  control: Control<Values>
  customer: Values['customer']
  orderItemsValues: Values['orderItems']
  postCost: Values['postCost']
  packet: Values['packet']
  setValue: UseFormSetValue<Values>
}) {
  // const { mutators } = useForm()
  // const { values: { customer, total_weight } } = useFormState()
  return <TableRow>
    <TableCell align='right'>
      {customer?.city?.pindex && <Tooltip title={count} >
        <IconButton aria-labelledby={count} disabled={busy}
          onClick={() => postCostCount({
            pindex: String(customer.city?.pindex),
            weight: orderItemsWeight(orderItemsValues),
            setValue
          })}>
          <CalculateIcon />
        </IconButton>
      </Tooltip>}
    </TableCell>
    <TableCell className='text-sm'>
      <div className='grid gap-1 mb-6 md:grid-cols-4 pt-4' >
        <Controller name="postCost"
          control={control}
          render={({ field }) => <TextField {...field}
            id="postCost"
            label={labels.postCost}
            type="number"
            variant="outlined"
            size="small"
            disabled={busy}
            InputProps={{
              endAdornment: <InputAdornment position="end">₽</InputAdornment>,
            }}
            inputProps={{
              inputMode: 'decimal',
              step: '0.1',
            }}
          />}
        />
        {/*        <div className='pt-3 pl-2'>
          <AddIcon size={22} />
        </div>*/}
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
              {labels.packetChoices.map(
                ({ value, display_name }, key) => <MenuItem key={key} value={value}>
                  {display_name}
                </MenuItem>)}
            </Select>
          </FormControl>}
        />
        <TextField
          label={labels.postCostWithPacket}
          size="small"
          value={postCostWithPacket({postCost, packet})}
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">₽</InputAdornment>,
          }}
        />
        <TextField
          label={labels.postDiscount}
          size="small"
          value={postDiscount({ orderItemsValues, postCost, packet }).toFixed(2)}
          disabled
          InputProps={{
            endAdornment: <InputAdornment position="end">₽</InputAdornment>,
          }}
        />
      </div>
    </TableCell>
    <TableCell colSpan={2} />
    <TableCell align='right'>
      {totalPostals({ orderItemsValues, postCost, packet }).toFixed(2)}₽
    </TableCell>
    <TableCell align='right'>
      {consts.PACKET_WEIGHT}
    </TableCell>
    <TableCell />
  </TableRow>
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