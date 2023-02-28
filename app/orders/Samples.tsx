import { Translation } from '@/app/i18n/dictionaries'
import consts from './consts.json'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

export default function Samples({
  labels,
  units,
}: {
  labels: Translation['order']
  units: Translation['unites']
}) {
  return <tr className="border-b border-gray-200 hover:bg-gray-100" >
    <td colSpan={5}>
{/*      <Label name="samples"
        label={labels.samples}
      />*/}
      {labels.samples}
    </td>
    <td>
      <TextField
        id="samples_weight"
        type="number"
        variant="outlined"
        size="small"
        disabled
        value={consts.SAMPLES_WEIGHT}
        InputProps={{
          endAdornment: <InputAdornment position="end">{units.gram_short}</InputAdornment>,
        }}
      />
    </td>
  </tr>
}


// {/*      <Field name="samples_weight"
//         type="number"
//         disabled
//         component={Input}
//         className='text-right w-20'
//       />*/}
