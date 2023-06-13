import { Calculate } from '@mui/icons-material'
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Unstable_Grid2 as Grid
} from '@mui/material'
import Tooltip from '@/app/components/Tooltip'
import type { Translation } from '@/app/i18n/dictionaries'
import { type Control, Controller, type UseFormSetValue } from "react-hook-form"
import consts from './consts.json'
import type { SerializedOrderObject } from '@/interfaces/orders'
import { unitsLabel } from '@/app/_objects/formHelpers'
import { orderItemsCost, totalWeight } from './Form'

export function postCostWithPacket({
  postCost,
  packet
}: {
  postCost: SerializedOrderObject['postCost']
  packet: SerializedOrderObject['packet']
}) {
  return Number(postCost) + Number(packet)
}

export function postDiscount({
  orderItemsValues,
  postCost,
  packet
}: {
  orderItemsValues: SerializedOrderObject['orderItems']
  postCost: SerializedOrderObject['postCost']
  packet: SerializedOrderObject['packet']
}) {
  return orderItemsCost(orderItemsValues) >= consts.SUM_FOR_POST_DISCOUNT
    ? postCostWithPacket({ postCost, packet }) * consts.POST_DISCOUNT_PERCENT / 100
    : 0
}

export function totalPostals(values: {
  orderItemsValues: SerializedOrderObject['orderItems']
  postCost: SerializedOrderObject['postCost']
  packet: SerializedOrderObject['packet']
}) {
  return postCostWithPacket(values) - postDiscount(values)
}

function countPostCost({
  pindex,
  weight,
  setValue
}: {
  pindex: string
  weight: number
  setValue: UseFormSetValue<SerializedOrderObject>
}): void {
  const searchParams = new URLSearchParams({
    from_index: String(process.env.NEXT_PUBLIC_FROM_INDEX),
    to_index: pindex,
    weight: weight.toFixed(0),
  })
  fetch(`${process.env.NEXT_PUBLIC_POST_BASE_URL}?${searchParams}`)
    .then((response) => response.json())
    .then(({ posilka_nds: posilkaNds }) => {
      return setValue('postCost', posilkaNds ?? 0)
    })
    .catch((e) => console.error(e))
}

export default function Postals({
  count,
  labels,
  busy,
  control,
  pindex,
  orderItemsValues,
  postCost,
  packet,
  setValue,
  // defaultValues,
}: {
  count: string,
  labels: Translation['order']
  busy: boolean
  control: Control<SerializedOrderObject>
  pindex?: string | null
  orderItemsValues: SerializedOrderObject['orderItems']
  postCost: SerializedOrderObject['postCost']
  packet: SerializedOrderObject['packet']
  setValue: UseFormSetValue<SerializedOrderObject>
  // defaultValues: Omit<Values, 'customer'>
}) {
  return <tr className='border-b dark:border-neutral-500 mt-1'>
    <td className='whitespace-nowrap px-6 py-4' align='right'>
      {pindex && <Tooltip title={count} >
        <IconButton aria-labelledby={count} disabled={busy}
          onClick={() => countPostCost({
            pindex,
            weight: totalWeight(orderItemsValues),
            setValue
          })}>
          <Calculate />
        </IconButton>
      </Tooltip>}
    </td>
    <td className='whitespace-nowrap px-6 py-4'>
      <div className={`grid grid-cols-4 gap-1 ${busy ? 'opacity-70' : ''}`}>
        <Controller name="postCost"
          control={control}
          render={({ field: { value, ...field } }) => <TextField {...field}
            id="postCost"
            value={value || ''}
            label={labels.postCost}
            type="number"
            variant="outlined"
            size="small"
            disabled={busy}
            InputProps={unitsLabel('₽')}
            inputProps={{
              inputMode: 'decimal',
              step: '0.1',
            }}
          />}
        />
        <Controller name="packet"
          control={control}
          render={({ field: { value, ...field } }) => <FormControl size='small' fullWidth>
            <InputLabel id="packet-label">{labels.packet}</InputLabel>
            <Select
              {...field}
              value={value || ''}
              labelId="packet-label"
              id="packet"
              label={labels.packet}
              disabled={busy}
            >
              <MenuItem value=""><em>------</em></MenuItem>
              {labels.packetChoices.map(
                ({ value, display_name }) => <MenuItem key={value} value={value}>
                  {display_name}
                </MenuItem>)}
            </Select>
          </FormControl>}
        />
        <TextField
          label={labels.postCostWithPacket}
          size="small"
          value={postCostWithPacket({ postCost, packet })}
          disabled
          InputProps={unitsLabel('₽')}
        />
        <TextField
          label={labels.postDiscount}
          size="small"
          value={postDiscount({ orderItemsValues, postCost, packet }).toFixed(2)}
          disabled
          InputProps={unitsLabel('₽')}
        />
      </div>
    </td>
    <td className='whitespace-nowrap px-6 py-4' colSpan={2} />
    <td className='whitespace-nowrap px-6 py-4' align='right'>
      {totalPostals({ orderItemsValues, postCost, packet }).toFixed(2)}₽
    </td>
    <td className='whitespace-nowrap px-6 py-4' align='right' colSpan={2}>
      {consts.PACKET_WEIGHT}({labels.packet}) + {consts.SAMPLES_WEIGHT}({labels.samples})
    </td>
  </tr>
}
