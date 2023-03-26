import CalculateIcon from '@mui/icons-material/Calculate'
import Tooltip from '@/app/useClient/Tooltip'
import type { Translation } from '@/app/i18n/dictionaries'
import { type Control, Controller, type UseFormSetValue } from "react-hook-form"
import TextField from '@mui/material/TextField'
import consts from './consts.json'
import type { OrderObject as Order } from '@/interfaces/orders'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { unitsLabel } from '@/app/form/helpers'
import { orderItemsCost, totalWeight } from './Form'
import Grid from '@mui/material/Unstable_Grid2'

export function postCostWithPacket({
  postCost,
  packet
}: {
  postCost: Order['postCost']
  packet: Order['packet']
}) {
  return Number(postCost) + Number(packet)
}

export function postDiscount({
  orderItemsValues,
  postCost,
  packet
}: {
  orderItemsValues: Order['orderItems']
  postCost: Order['postCost']
  packet: Order['packet']
}) {
  return orderItemsCost(orderItemsValues) >= consts.SUM_FOR_POST_DISCOUNT
    ? postCostWithPacket({ postCost, packet }) * consts.POST_DISCOUNT_PERCENT / 100
    : 0
}

export function totalPostals(values: {
  orderItemsValues: Order['orderItems']
  postCost: Order['postCost']
  packet: Order['packet']
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
  setValue: UseFormSetValue<Order>
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
  control: Control<Order>
  pindex?: string | null
  orderItemsValues: Order['orderItems']
  postCost: Order['postCost']
  packet: Order['packet']
  setValue: UseFormSetValue<Order>
  // defaultValues: Omit<Values, 'customer'>
}) {
  // const [packetValue, setPacketValue] = useState(String(defaultValues.packet || ''))
  return <TableRow sx={{ mt: 1 }} >
    <TableCell align='right'>
      {pindex && <Tooltip title={count} >
        <IconButton aria-labelledby={count} disabled={busy}
          onClick={() => countPostCost({
            pindex,
            weight: totalWeight(orderItemsValues),
            setValue
          })}>
          <CalculateIcon />
        </IconButton>
      </Tooltip>}
    </TableCell>
    <TableCell>
      <Grid container spacing={1}>
        <Grid xs={3}>
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
        </Grid>
        <Grid xs={3}>
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
                  ({ value, display_name }, key) => <MenuItem key={key} value={value}>
                    {display_name}
                  </MenuItem>)}
              </Select>
            </FormControl>}
          />
        </Grid>
        <Grid xs={3}>
          <TextField
            label={labels.postCostWithPacket}
            size="small"
            value={postCostWithPacket({ postCost, packet })}
            disabled
            InputProps={unitsLabel('₽')}
          />
        </Grid>
        <Grid xs={3}>
          <TextField
            label={labels.postDiscount}
            size="small"
            value={postDiscount({ orderItemsValues, postCost, packet }).toFixed(2)}
            disabled
            InputProps={unitsLabel('₽')}
          />
        </Grid>
      </Grid>
    </TableCell>
    <TableCell colSpan={2} />
    <TableCell align='right'>
      {totalPostals({ orderItemsValues, postCost, packet }).toFixed(2)}₽
    </TableCell>
    <TableCell align='right' colSpan={2}>
      {consts.PACKET_WEIGHT}({labels.packet})+{consts.SAMPLES_WEIGHT}({labels.samples})
    </TableCell>
  </TableRow>
}
