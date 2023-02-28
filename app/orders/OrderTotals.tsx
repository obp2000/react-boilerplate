import { Translation } from '@/app/i18n/dictionaries'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

export default function OrderTotals({
  labels,
  units
}: {
  labels: Translation['order']
  units: Translation['units']
}) {
  return <tr className="border-b border-gray-200 hover:bg-gray-100" >
    <td colSpan={4}>
{/*      <Label name="total_sum"
        label={labels.total_sum}
      />*/}
      {labels.total_sum}
    </td>
    <td>
      <TextField
        id="total_sum"
        type="number"
        variant="outlined"
        size="small"
        disabled
        // value={consts.SAMPLES_WEIGHT}
        InputProps={{
          endAdornment: <InputAdornment position="end">₽</InputAdornment>,
        }}
      />
    </td>
    <td>
      <TextField
        id="total_weight"
        type="number"
        variant="outlined"
        size="small"
        disabled
        // value={consts.SAMPLES_WEIGHT}
        InputProps={{
          endAdornment: <InputAdornment position="end">{units.gram_short}</InputAdornment>,
        }}
      />
    </td>
  </tr>
}


      // <Field name="total_sum"
      //   label={labels.total_sum}
      //   type="number"
      //   disabled
      //   component={Input}
      //   className='text-right w-20'
      // />

      // <Field name="total_weight"
      //   type="number"
      //   disabled
      //   component={Input}
      //   className='text-right w-20'
      // />
